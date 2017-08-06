# Folha Limpa Client

Folha Limpa é um projeto do Hackfest 2017 que tem como objetivo exibir visualizações de anomalias nas folhas de pagamento do estado e dos municípios da Paraíba.

O Folha Limpa pode ser acessado no endereço: [folhalimpa.org](http://folhalimpa.org/).

## Como executar localmente

O Folha Limpa utiliza o [Docker](https://www.docker.com) para sua execução.

Pra construir a imagem do docker do client, execute de dentro da raiz do projeto:

`docker-compose build client`

O docker construirá uma imagem a partir do `Dockerfile` e depois que o processo terminar você verá uma imagem chamada `fl-client` quando executar o comando `docker images`. Para criar um container a partir da imagem criada no passo anterior, execute `docker-compose up client`. Quando o processo terminar, você deverá ter o client rodando na porta 80. Para verificar, use a url http://127.0.0.1 no seu navegador.
