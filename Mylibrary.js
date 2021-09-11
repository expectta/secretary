// node.js swagger 설정
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	swaggerDefinition: {
		info: {
			//스웨거 문서 작성될 내용들.
			title: 'datda API',
			version: '1.0.0',
			description: 'datda API 문서',
		},
		//TODO : 배포링크로 전환 필요함.
		//실 서버 배포 시 host 변경이 필요함.
		host: 'localhost:5000',
		basePath: '/',
		contact: {
			email: "expect.ta@gmail.com"
		},
		//TODO : api_key 등록 후 사용필요
		// securityDefinitions: {
		// 	api_key: {
		// 		type: 'apiKey',
		// 		in: 'header',
		// 		name: 'api_key',
		// 	}
		// }
	},
	//1. routes 폴더 아래 .js파일로 정의, 2. swagger폴더 아래 swagger 설정
	apis: ['./routes/*.js', './swagger/*']
};
const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };

//nest.js swagger 설정 파일로
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('datda API Document')
    .setDescription('datda service API 문서입니다.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api_docs', app, document);
}

//typeorm으로 데이터 베이스 내 entity 모두 가져오는 방법
//npm i -g typeorm-model-generator 설치
//typeorm-model-generator -h <database_host> -d <database>-p <port> -u <userId> -x <userPassword>! -e <database종류>-o <저장위치> 
//다운로드가 완료되면 entities라는 파일로 저장 된다.

//validation 코드
//입력값이 존재하는지 여부 확인
function isEmpty(value) {
  return value.length === 0;
}
​//입력값의 길이제 대한 제한
function moreThanLength(str, n) {
  return str.length >= n;
}
//영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}
//최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}
​//핸드폰 번호
function isPhoneNumber(num) {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(num);
}

