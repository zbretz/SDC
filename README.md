# Questions and Answers Microservice
  Supporting Atelier e-commerce front-end.
  
  [Supported Endpoints](#supported-endpoints)  
  [Example JSON](#example-response)  
  [System Architecture](#system-architecture)  
 
## Supported Endpoints
• GET /qa/questions  
• GET /qa/questions/:question_id/answers  
• POST /qa/questions  
• POST /qa/questions/:question_id/answers  
• PUT /qa/questions/:question_id/helpful  
• PUT /qa/questions/:question_id/report  
• PUT /qa/answers/:answer_id/report  

## Example Response
• GET /qa/questions  
  > Retrieves a list of questions for a particular product. This list does not include any reported questions.

### Parameters

| Parameter   | Type     | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| product_id  | integer  | Specifies the product for which to retrieve questions.    |
| page        | integer  | Selects the page of results to return. Default 1.         |
| count       | integer  | Specifies how many results per page to return. Default 5. |


### Sample JSON
```
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```
## System Architecture

<img width="652" alt="Screen Shot 2021-09-28 at 3 35 30 PM" src="https://user-images.githubusercontent.com/25594509/135169112-d329686d-dd8c-4caa-9c65-d9105906aaea.png">

