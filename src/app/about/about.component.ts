import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  contributors = [
    {
      name: 'Lucas "Nando Brandão" Dias',
      rule: 'Criador de Conteúdo',
      description: 'Projetista, o cara que faz vários projetinhos e organiza os posts.',
      imagePath: '../../assets/images/creators/lucas.jpg'
    },
    {
      name: 'Diogo Tsuyoshi Shikuma',
      rule: 'Criador de Conteúdo',
      description: 'Hardwareman, o cara que manja do hardware e adora por a mão na massa para fazer os posts mais insanos de Games.',
      imagePath: '../../assets/images/creators/diogo.jpg'
    },
    {
      name: 'Luiz Gustavo Cardoso Leme',
      rule: 'Criador de Conteúdo',
      description: 'Pogramador, o cara que desenvolveu todo o esquema do site e nas horas vagas "faz uns posts aí".',
      imagePath: '../../assets/images/creators/luiz.jpg'
    }
  ]
}
