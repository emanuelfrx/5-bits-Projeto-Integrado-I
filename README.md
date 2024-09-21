# 5-bits-Projeto-Integrado-I
Repositório destinado a criação, desenvolvimento e atualização de uma aplicação web voltada para eventos do curso de Sistemas e Mídias Digitais
# Link Figma
https://www.figma.com/design/MhpQcWDmXkblj9qxGSrcbQ/5Bits---Projeto-Integrado-I---2024.1?node-id=0-1&t=GhCOcYhp2jbqkBk8-1
# Modelo conceitual
https://lucid.app/lucidchart/4c3b7861-ba0c-4f7b-a399-a15e026887a7/edit?viewport_loc=-2814%2C-802%2C4992%2C2343%2C0_0&invitationId=inv_e842866e-8460-4677-8f29-f93a44d8370f
| Concluído | ID   | Requisito Funcional                                         | Descrição                                                                                                       |
|-----------|------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| [x]       | RF01 | Definir um usuário padrão/root para cadastrar os administradores | Permitir aos desenvolvedores a criação de um usuário root, com permissões para cadastrar, gerenciar e remover os primeiros administradores. |
| [x]       | RF02 | Editar características dos demais Administradores         | Permitir ao usuário root editar detalhes dos administradores.                                                |
| [x]       | RF03 | Autenticar Perfil do Usuário pelo Login                   | Permitir aos administradores e monitores do evento autentiquem-se pelo login com nome, senha e cargo.          |
| [x]       | RF04 | Cadastrar evento                                           | Permitir ao administrador do evento o cadastro de um novo evento no sistema com campos de título, data de início e de fim, descrição, adicionar atividades, adicionar administradores e adicionar participantes. |
| [x]       | RF05 | Editar características do evento                           | Permitir ao administrador do evento editar nome, lista de participantes e duração do evento.                   |
| [x]       | RF06 | Arquivar evento                                           | Permitir ao administrador do evento arquive eventos sem sua exclusão.                                         |
| [x]       | RF07 | Adicionar atividades no evento                             | Permitir aos administradores do evento adicionar atividades com dias em que será ministrada, horários, palestrantes/instrutores e foto dos instrutores. |
| [x]       | RF08 | Adicionar demais administradores do evento                 | Permitir ao administrador do evento e do sistema adicionar administradores ao evento.                          |
| [x]       | RF09 | Remover administrador do evento                             | Permitir aos administradores do evento e do sistema a exclusão de outros administradores de um evento.        |
| [x]       | RF10 | Adicionar monitores do evento                              | Permitir ao administrador do evento adicione monitores ao evento.                                            |
| [x]       | RF11 | Editar características dos monitores                       | Permitir ao administrador do evento edite detalhes dos monitores do evento.                                   |
| [x]       | RF12 | Listar atividades de um evento                             | Permitir aos administradores e monitores do evento listem todos os eventos e verifiquem se estão ativos.     |
| [x]       | RF13 | Editar características de uma atividade do evento         | Permitir aos administradores do evento editar detalhes das atividades do evento, como dias, horários e palestrantes. |
| [x]       | RF14 | Visualizar lista de atividades em que um participante está cadastrado | Permitir ao administrador do evento ver atividades nas quais um participante está inscrito.                     |
| [x]       | RF15 | Adicionar lista de participantes do evento                 | Permitir ao administrador do evento adicione, por meio da importação de um arquivo csv, todos os participantes no evento em ação única (terão acesso a todo o evento). |
| [x]       | RF16 | Adicionar participante único no evento (com acesso a todo o evento) | Permitir ao administrador do evento adicionar um participante unitário com acesso total ao evento.            |
| [x]       | RF17 | Incluir matrícula do participante, se for um aluno da UFC. | Permitir ao administrador do evento incluir a matrícula ao adicionar um participante unitário.                 |
| [x]       | RF18 | Listar participantes inscritos no evento                   | Permitir ao administrador do evento visualize todos os participantes que se inscreveram no evento.            |
| [x]       | RF19 | Arquivar participante                                       | Permitir ao administrador do evento arquivar participantes sem excluir suas informações do sistema.           |
| [x]       | RF20 | Associar estudante a uma atividade                         | Permitir ao administrador do evento associar estudante a uma determinada atividade do evento.                 |
| [x]       | RF21 | Confirmar (por checkbox) o credenciamento do participante   | Permitir aos administradores e monitores do evento confirmar o credenciamento do participante por checkbox.    |
| [x]       | RF22 | Confirmar (por checkbox) a presença dos participantes no evento | Permitir aos administradores e monitores do evento confirmar a presença dos participantes por checkbox.        |
| [x]       | RF23 | Registrar presença de um participante no evento se ele tiver estado presente em alguma atividade | Permitir ao sistema que contabilize uma pessoa na lista total de participantes do evento se ela esteve presente em uma das atividades. |
| [x]       | RF24 | Listar (indicando a quantidade numericamente) participantes presentes ao total que compareceram em algum momento no evento | Permitir listar e indicar numericamente a quantidade de pessoas totais que compareceram àquele evento.        |
| [x]       | RF25 | Registrar presença por meio da leitura de um QR Code      | Permitir ao participante do evento registrar a presença usando leitura de QR Code.                             |
| [x]       | RF26 | Verificar se participante se tornou elegível a receber o certificado | Permitir ao administrador do evento verificar se o participante é elegível para receber o certificado.         |
| [x]       | RF27 | Listar participantes elegíveis a receber certificados       | Permitir ao administrador do evento gerar a lista de participantes elegíveis para certificados com nome e matrícula. |
| [x]       | RF28 | Gerar certificado com dados de cada participante e seu ID único | Permitir ao administrador do evento gerar certificados com dados e ID único dos participantes.                 |


# Requisito Não  Funcional
RNF25 Ser acessível através de navegadores modernos\
RNF26 Suportar importação de listas\
RNF27 Notificar o usuário da emissão de certificado\
RNF28 Garantir segurança dos dados\
RNF29 Ser amigável e intuitivo\
RNF30 Garantir integridade dos dados\
RNF31 Ter alta disponibilidade\
RNF32 Ser escalável


 
# O projeto da equipe 5Bits conta com a colaboração dos estudantes:

Ana Leticia de Sousa Lourinho\
Antonio Emanuel Franca Freitas\
Estefane Cavalcante da Silva\
Eugênio Vitor da Silva Nascimento\
Guilherme Ferreira Gomes

# Instalação e Execução do Projeto 


Tutorial v1
	
1. Instalar o **Node Js 20.12.2 LTS** na sua maquina a partir do link abaixo https://nodejs.org/en/download/prebuilt-installer
2.  Clique em <b>Next</b>  
<img src="https://www.alura.com.br/artigos/assets/como-instalar-node-js-windows-linux-macos/imagem1.jpg"  alt="Passo 1">
3. Clique em <b>Next</b>
  <p align="center">
<img src="https://www.alura.com.br/artigos/assets/como-instalar-node-js-windows-linux-macos/imagem3.jpg" alt="Passo 2">
  </p>
5. Aceite os termos e Clique em <b>Next</b>
   <p align="center">
<img src="https://www.alura.com.br/artigos/assets/como-instalar-node-js-windows-linux-macos/imagem4.jpg"  align="center"  alt="Passo 3">
</p>
6. Clique em <b>Next</b>   
  <p align="center">
<img src="https://www.alura.com.br/artigos/assets/como-instalar-node-js-windows-linux-macos/imagem7.jpg"  align="center"  alt="Passo 4">
  </p>
7. Para verificar se o node foi realmente instalado na sua maquina abra o cmd com o comando <b>Windows + R</b>   digite <b>cmd</b>  
e em seguida digite o comando **node --version**  
  <p align="center">
<img src="https://github.com/user-attachments/assets/43f2e789-2fe8-4ddc-aba3-d22c168ccb66"  align="center"  alt="Passo 2">
  </p>
8. Instalar o editor de código-fonte desenvolvido **VsCode** a partir do link abaixo de acordo com o software da máquina 
https://code.visualstudio.com/download <br>
  <p align="center">
<img src="https://hub.asimov.academy/wp-content/uploads/2024/02/downloadvscode-1-1024x634.png"  align="center"  alt="Vscode"> <br>
  </p>


9. Logo após instalar a versão adequada ao o MySQL a partir do link abaixo clicando em **WIndows(x86, 32-bit), MSI Installer”
https://dev.mysql.com/downloads/installer/** <br>
  <p align="center">
   <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/MySQL_4.png" alt="Texto Alternativo">
  </p>
10. Logo após clique em **No thank, just start my download** <br>
  
11. Após o download clique no instalador e siga os passos abaixo para a instalação
  <p align="center">
 <img src= "https://programadorviking.com.br/wp-content/webp-express/webp-images/uploads/2019/03/como-instalar-mysql-windows-linux-macos-01.png.webp" alt="Instaler">
  </p>
12. Logo após clique em <b>Next</b> novamente <br>
13. Logo após escolha o modo de uso do seu banco as opções são: <br>
  <p align="center">
<img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/MySQL_9.png" alt="Passo 7"><br>
  </p>
<p><b>Desenvolvimento: </b> Um computador que hospeda muitos outros aplicativos e normalmente é sua estação de trabalho pessoal. Esta configuração configura o MySQL para usar a menor quantidade de memória.</p>
<p><b>Servidor: </b>Espera-se que vários outros aplicativos sejam executados neste computador, como um servidor web. A configuração Servidor configura o MySQL para usar uma quantidade média de memória.</p>
<p> <b>Dedicado:</b> Um computador dedicado à execução do servidor MySQL. Como nenhum outro aplicativo importante é executado neste servidor, esta configuração configura o MySQL para usar a maior parte da memória disponível.</p>
<p><b>Manual:</b> Impede que o MySQL Installer tente otimizar a instalação do servidor e, em vez disso, define os valores padrão para as variáveis ​​do servidor incluídas no arquivo de configuração my.ini. Com o tipo Manual selecionado, o MySQL Installer usa o valor padrão de 16M para a atribuição da variável tmp_table_size.</p>
11. Logo após clique em <b>Next</b><br>
12. Logo após insira a <b>Senha</b> do seu acesso  <br>
  <p align="center">
<img src= "https://www.simplilearn.com/ice9/free_resources_article_thumb/MySQL_10.png">
  </p>
13. Depois prossiga clicando em <b>Next</b> para prosseguir com a instação <br>
  <p align="center">
<img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/MySQL_10.png">
  </p>
14. Agora insira sua senha para poder entrar no seu ambiente <b>MySql Workbench</b> <br>
  <p align="center">
<img src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGPqlGbSMQqL7a-NNEC2uvhVa85nLLMZ3yuTccCrhyFMzXZFQpNhgHTKVDHX5p_l0na2zWLS38QS-z8NjTMPqX83M1F3kD5vmmBBaA6cjv9GiBwbTugwvFoX-pmHng2zkKj6ECXGAuGX4/s640/2017-09-03+18_17_47-Greenshot.png" alt = "">
  </p>
15. Após entrar na area principal do mysql workbench voce pode clicar na aba <b>FIle</b> e clicar em <b>Open Model</b> <br>
16. Agora insira sua senha para entrar <br>






