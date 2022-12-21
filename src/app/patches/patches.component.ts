import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patches',
  templateUrl: './patches.component.html',
  styleUrls: ['./patches.component.css']
})
export class PatchesComponent implements OnInit {

  notes = [
    {
      title: 'Versão 0.0.1',
      content: `+ Notas de versões: Agora é possível visualizar as atualizações que ocorrem aqui no Contermal Inforudo.
      + Sistema de curtidas e visualizações: Agora é possível adicionar uma curtida para o post que você gostar, ao clicar para continuar lendo um post também será adicionado uma visualização para o post, este sistema funciona de navegador para navegador, ou seja se você acessar nosso blog com outro navegar será contabilizada uma nova visualização ou curtida.
      + Nova visualização dos cards de posts: Agora os cards contam com uma nova face, mostrando as imagens e com um tamanho maior.
      + Nova funcionalidade: Agora é possível sair de um post apertando a tecla ESC.
      `
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
