import React, { Component } from "react";
import Form from './Form';
import Tarefas from './Tarefas';
import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  };

  componentDidMount () {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(!tarefas) return;

    this.setState({ tarefas})
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if(tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas))

    console.log('As tarefas mudaram', tarefas)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, novaTarefa, index } = this.state;

    if (tarefas.indexOf(novaTarefa) !== -1) return;
    if (novaTarefa === "" || novaTarefa === undefined) return;

    if (index === -1) {
      this.setState({
        tarefas: [...tarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      const novasTarefas = [...tarefas];
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: ''
      })
    }
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    })
  };
  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    })
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />

      </div>
    );
  }
}
