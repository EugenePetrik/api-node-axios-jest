## Sample project for API testing

### Test Services 
https://jsonplaceholder.typicode.com/

### Requirements
- NodeJS
- GIT

### Install project

```bash
npm i
```

### Run tests

```bash
npm t
```

### Run tests from a specific file

```bash
npm t -- ./tests/posts/posts.test.js
```

### Run tests in docker

- Build Docker image:

```bash
docker build . -t <image_name:image_tag>
```

For example,

```bash
docker build . -t api-node-axios-jest:latest
```

- Run tests:

```bash
docker run -it --rm <image_name:image_tag>
```

For example,

```bash
docker run -it --rm api-node-axios-jest:latest
```

- Save test report:

```bash
docker run -v ${PWD}/reports:/app/reports -it --rm api-node-axios-jest
```

### Run tests in docker-compose

```bash
docker-compose up
```

```bash
docker-compose down
```
