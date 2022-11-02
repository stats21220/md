import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; // идет вместе с nest по дефолту (позволяет тестировать все роуты)
import { AppModule } from '../src/app.module';
import { CreateReviewDTO } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

// за мокаю объект который будем передовать
const product_id = new Types.ObjectId().toHexString()
const testDto: CreateReviewDTO = {
	product_id,
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание',
	rating: 5
}

describe('ReviewController (e2e)', () => { // describe описывает группу тестов (может быть вложенным)
	let app: INestApplication;  //объевляем целиковое приложение которое будет инициализироваться
	let createdId: string //создаем локальную переменную для теста

	beforeEach(async () => { // beforeEach будет выполнять код перед каждым запуском теста (тоесть перед каждым it бедет выполняться beforeEach)
		const moduleFixture: TestingModule = await Test.createTestingModule({ // создает тестовый модуль 
			imports: [AppModule], // можем ипортировать что угодно (для unit тестов сюда будет импортироваться один контроллер или сервис который мы будем тестировать) в данном случае импортируется целиковый модуль чтобы запустить все приложение 
		}).compile();

		app = moduleFixture.createNestApplication(); // создается nest приложение
		await app.init();
	});
	// после того как приложение готово мы можем тестировать его отправляя запросы в данном случае
	//it описывает один конкретыней keys теста
	it('/review/create (POST) - success', async () => {
		// (supertest) получает http сервер приложения и внего напряму отправляет запросы
		return await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto) // позволяет передать во внутрь объект( по типу body)
			//.expect('Hello World!'); // проверям то что мы получаем
			.expect(201) // проверяем какой мы ожидаем код ответа 
			//(при использовании then функция становиться асинхронной)
			.then(({ body }: request.Response) => {
				createdId = body._id // сохраняю ключ для удаления
				expect(createdId).toBeDefined() // проверяю что он есть (функция expect стандартаня jest)
				//и дальше мы можем сделать наборы проверок expect. и список проверок которые позволяют упростить проверку
				// toBeDefined проверяяет что он должен быть задан)
			}) // принимает стрелочную функцию (в этой функции и будет ответ который мы можем как то разобрать) (этот респонсе не от express и не http) этот респонсе именно реквеста - деструктаризирую и беру боди
	});

	it('/review/create (POST) - fail', async () => {
		return await request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body);

			})
	});

	it('/review/byProduct/productId - success (GET)', async () => {
		return await request(app.getHttpServer())
			.get('/review/byProduct/' + product_id)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1)
			})
	});

	it('/review/byProduct/productId (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
	});

	it('/review/byProduct/productId (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/')
			.expect(404)
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200)
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND
			})
	});
	afterAll(() => {
		disconnect()
	})
});


// так же есть beforeAll который пополянется перед всем
// afterEach будет выполняться после it
// afterAll который будет выполняться после всех выполненых тестов


//npm run test:e2e