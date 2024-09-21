# 5-bits-Projeto-Integrado-I
Repositório destinado a criação, desenvolvimento e atualização de uma aplicação web voltada para eventos do curso de Sistemas e Mídias Digitais
# Link Figma
https://www.figma.com/design/MhpQcWDmXkblj9qxGSrcbQ/5Bits---Projeto-Integrado-I---2024.1?node-id=0-1&t=GhCOcYhp2jbqkBk8-1
# Modelo conceitual
https://lucid.app/lucidchart/4c3b7861-ba0c-4f7b-a399-a15e026887a7/edit?viewport_loc=-2814%2C-802%2C4992%2C2343%2C0_0&invitationId=inv_e842866e-8460-4677-8f29-f93a44d8370f
| Requisito Funcional                                    | Descrição                                                                                                       |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| <ul><li>[x] RF01</li></ul>                            | Definir um usuário padrão/root para cadastrar os administradores.                                              |
| <ul><li>[x] RF02</li></ul>                            | Editar características dos demais Administradores.                                                            |
| <ul><li>[x] RF03</li></ul>                            | Autenticar Perfil do Usuário pelo Login.                                                                       |
| <ul><li>[x] RF04</li></ul>                            | Cadastrar evento.                                                                                              |
| <ul><li>[x] RF05</li></ul>                            | Editar características do evento.                                                                               |
| <ul><li>[x] RF06</li></ul>                            | Arquivar evento.                                                                                               |
| <ul><li>[x] RF07</li></ul>                            | Adicionar atividades no evento.                                                                                 |
| <ul><li>[x] RF08</li></ul>                            | Adicionar demais administradores do evento.                                                                    |
| <ul><li>[x] RF09</li></ul>                            | Remover administrador do evento.                                                                                |
| <ul><li>[x] RF10</li></ul>                            | Adicionar monitores do evento.                                                                                 |
| <ul><li>[x] RF11</li></ul>                            | Editar características dos monitores.                                                                          |
| <ul><li>[x] RF12</li></ul>                            | Listar atividades de um evento.                                                                                |
| <ul><li>[x] RF13</li></ul>                            | Editar características de uma atividade do evento.                                                             |
| <ul><li>[x] RF14</li></ul>                            | Visualizar lista de atividades em que um participante está cadastrado.                                          |
| <ul><li>[x] RF15</li></ul>                            | Adicionar lista de participantes do evento.                                                                    |
| <ul><li>[x] RF16</li></ul>                            | Adicionar participante único no evento (com acesso a todo o evento).                                           |
| <ul><li>[x] RF17</li></ul>                            | Incluir matrícula do participante, se for um aluno da UFC.                                                    |
| <ul><li>[x] RF18</li></ul>                            | Listar participantes inscritos no evento.                                                                      |
| <ul><li>[x] RF19</li></ul>                            | Arquivar participante.                                                                                         |
| <ul><li>[x] RF20</li></ul>                            | Associar estudante a uma atividade.                                                                             |
| <ul><li>[x] RF21</li></ul>                            | Confirmar (por checkbox) o credenciamento do participante.                                                    |
| <ul><li>[x] RF22</li></ul>                            | Confirmar (por checkbox) a presença dos participantes no evento.                                              |
| <ul><li>[x] RF23</li></ul>                            | Registrar presença de um participante no evento se ele tiver estado presente em alguma atividade.               |
| <ul><li>[x] RF24</li></ul>                            | Listar (indicando a quantidade numericamente) participantes presentes ao total que compareceram em algum momento no evento. |
| <ul><li>[x] RF25</li></ul>                            | Registrar presença por meio da leitura de um QR Code.                                                          |
| <ul><li>[x] RF26</li></ul>                            | Verificar se participante se tornou elegível a receber o certificado.                                         |
| <ul><li>[x] RF27</li></ul>                            | Listar participantes elegíveis a receber certificados.                                                         |
| <ul><li>[x] RF28</li></ul>                            | Gerar certificado com dados de cada participante e seu ID único.                                              |



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






