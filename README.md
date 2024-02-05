# AMFPAY

Amfpay é um projeto de estudo sobre melhores práticas, arquiteturas e metodologias para desenvolver um projeto escalável, de fácil manutenção e performático

## Funcionalidades (Endpoints)

>1. Transferência

Descrição: Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários;
Lojistas só recebem transferências, não enviam dinheiro para ninguém;
Validar se o usuário tem saldo antes da transferência;

### Endpoint: POST /transaction

Content-Type: application/json  

{
    "value": 100,
    "senderId": "41a07c5a-a8b0-4532-aece-c21a5d0474c2",
    "receiverId": "52409276-beb4-41f2-8064-066e61a59541"
}

>> 2. Aplicação

Descrição: Verificar se a aplicação está funcionando

### Endpoint: GET /healt

## Pré-requisitos

Para rodar este projeto utiliza-se Docker, você precisará ter os seguintes pré-requisitos instalados em sua máquina:

> 1. Docker:

Certifique-se de ter o Docker instalado. Se ainda não tiver, você pode baixá-lo e instalá-lo no site oficial ou 
instalá-lo em um wsl, fica a seu critério.

>> 2. Docker Compose:

O Docker Compose geralmente é incluído na instalação do Docker, mas verifique se você tem a versão correta. Para instalar ou atualizar o Docker Compose, siga as instruções no site Docker.

>>> Git (opcional):

Se você deseja clonar o repositório diretamente, certifique-se de ter o Git instalado.

## Pontos de Melhoria

>> Tratamento de Erros

Possui, mas não um tratamento de erros pensando mais a nível de produção, por exemplo, usando um pattern notification,
tratar a pilha de erros com mais inteligência.

>>> Injeção de dependência usando Container

Existem muitas bibliotecas fantásticas para usar, mas fiz uma só pra brincar, usei também outras formas de comunicar entre
as camadas como gateway, facade, depende muito do escopo do projeto e como fica acertado a arquitetura.

>>>> Teste de Unidade, Integração e E2E

Vacilei em não começar implementando os testes com TDD, isso é primordial para um projeto escalável, mas ainda dá tempo de salvar o projeto e aplicar os testes, pretendo fazer isso. Vai ficar top.

## Observações

Pode ser que quando rode o projeto encontre algo, pois posso estar no meio de um processo de mudança para melhoria, como não é
um projeto de produção ou de alguma empresa, não estou rodando um github action e sonar da vida para validar os commits, tanto
que estou comitando direto na main, que não nem de longe uma boa prática, no mínimo uma develop para depois criar PR(pull request), enfim.

Quando criar o projeto vão ser criados três registros de usuários, entre no banco local(mysql), com credenciais básicas, user:root, senha root e pegue os ids para testar transferência, pode ser que não dê tempo de criar um endpoint que busca os dados dos usuários. Vai precisar para preencher o senderId e o receiverId, como abaixo:

{
    "value": 100,
    "senderId": "41a07c5a-a8b0-4532-aece-c21a5d0474c2",
    "receiverId": "52409276-beb4-41f2-8064-066e61a59541"
}

## Instalação

Passos para instalar o projeto localmente.

```bash
git clone https://github.com/andrefagundes/amfpay.git

### Crie um arquivo .env na raiz do projeto com as seguintes constantes

DATABASE_URL="mysql://root:root@db:3306/dbamfpay"

AUTH_SERVICE_URL = 'https://run.mocky.io/v3/687d8d61-5961-4d70-8309-dc672c64c28d'

TRANSACTION_CREATED_EVENT_STATUS = 'https://run.mocky.io/v3/5698031f-e0d3-4ee3-a401-1eb9125b1144'

# Vá até a raiz do projeto e rode o docker como abaixo
docker compose up -d

# Verifique se subiu o banco e o app pelo comando abaixo ou pela rota GET, citada acima.
docker ps
