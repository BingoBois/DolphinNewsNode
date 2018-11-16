import elasticsearch from 'elasticsearch';

let client = new elasticsearch.Client({  
  hosts: [
    'http://dbdolphin.viter.dk:9200/'
  ]
});

export default client;
