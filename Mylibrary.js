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
//입력값의 길이제 대한 제한
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
//핸드폰 번호
function isPhoneNumber(num) {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(num);
}

//axios client request
export const handleReqeust= async (
  imageFile: any,
  title: string,
  content: string,
) => {
  axios.defaults.headers.common["authorization"] = JSON.parse(
    localStorage.getItem("loginInfo")!,
  ).accessToken;
  const formData = new FormData();
  formData.append("image", imageFile);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
};

//multerS3 config
 import { multer } from 'multer';
 import { multerS3 } from 'multerS3';
 import { aws } from 'aws-sdk';

 const s3 = new aws.S3({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.REGION,
 });
 const upload = multer({
   storage: multerS3({
     s3: s3,
     bucket: 'datda-img',
     contentType: multerS3.AUTO_CONTENT_TYPE, // ! 콘텐츠 타입을 자동으로 세팅(이 설정을 하지 않을 경우, 해당 사진이 저장된 URL로 입장 시 사진다운로드가 진행됨)
     acl: 'public-read', // ! 클라이언트에서 자유롭게 가용하기 위함
     metadata: function (req, file, cb) {
       cb(null, { fieldName: file.fieldname });
     },
     key: function (req, file, cb) {
       cb(null, Date.now().toString());
     },
   }),
   // limits: { fileSize: 5 * 1024 * 1024 }, // ! 용량과 관련
 });
// ! cf> 서버에 폴더 하나 만들어서 사진을 업로드 하고 싶다면 아래와 같이 하면 됨.
 // const upload = multer({
 //   dest: 'image/',
 // });
 module.exports = upload;

// nestjs CORS 적용 
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);

// nestjs CORS 설정
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
//test


//Javascript ES7 문법
//거듭제곱
var i = 2
i **= 3 // 8이 출력됩니다.

//includes 
//3이 있는지 찾습니다.
[1, 2, 3, 4, 5].includes(3) //true

//1이 첫번째에 있는지 찾습니다.
[1, 2, 3, 4, 5].includes(1, 0) //true


//for in, for of 문
const basket = ['apple', 'oranges', 'grapes'];
for (item of basket) {
  console.log(item);
}
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000
}

for (item in detailedBasket) {
  console.log(item);
}

//nestjs controller test Code
import {
  CACHE_MANAGER,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query, Scope,
  // UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { HistoryService } from "./history.service";

// @ApiTags('history')
@UseInterceptors(new TransformHeaderInterceptor())
// @ApiBearerAuth()
// @UseGuards(RequestGuard, AuthGuard)
@Controller({
  path: 'history',
  scope: Scope.DEFAULT, // nestjs 공식 문서에 이거 관련 설명 읽어볼만하다
})
export class HistoryController extends BaseController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly historyService: HistoryService,
  ) {
    super();
  }

  @HttpCode(HttpStatus.OK) // 리턴하는 응답코드
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // }) //* Swagger에서 표시되는 응답코드
  @ApiOperation({ summary: `유저의 모든 참여 이력을 가져온다.` }) // 이것도 스웨거
  // @UserHeaderReceiptDecorator() // jwt 토큰 해석해서 유저 id 알아내는 건데 나도 잘 모름
  // @CommonResponseReceiptDecorator() // 위에랑 비슷
  @Get()
  async getHistory(
    @accountId() accountIdModel: AccountIdModel,
    @Query() filterForHistory: FilterForHistoryDto,
  ): Promise<HistoryResultDto> {
    const cacheKey = `history.controller-${accountIdModel.accountId}-${JSON.stringify(filterForHistory)}`;

    if (await this.cacheManager.get(cacheKey)) {
      return this.cacheManager.get(cacheKey);
    }

    const history = await this.historyService.getHistory(accountIdModel.accountId, filterForHistory);
    await this.cacheManager.set(cacheKey, history, 5);
    return history;
  }
}

//syltedcompoent theme 지정
const pixelToRem = (size: number) => `${size / 16}rem`;

// fontSize
const fontSizes = {
  small: pixelToRem(14), // 0.8rem
  base: pixelToRem(16), // 1rem
  lg: pixelToRem(18),
  xl: pixelToRem(20),
  xxl: pixelToRem(22),
  xxxl: pixelToRem(24),
  titleSize: pixelToRem(50), //3.1rem
};

//디바이스 사이즈
const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "700px",
  tablet: "820px",
  tabletL: "1024px",
};

// 디바이스별 미디어쿼리
const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

// 자주 사용하는 색
const colors = {
  black: "#000000",
  gray: "#bcbcbc",
  green: "#3cb46e",
  blue: "#8c80ff",
};

// element의 base 디자인
const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
	`,
  //기본 버튼 (파란색)
  defaultButton: `
		background:#6f6eff;
		font-size:1rem;
		color:white;
		padding: 4px 15px 4px 15px;
    border: none;
		border-radius: 20px;
		outline:0px;
		cursor:pointer;
    text-decoration: none;
	`,
  //미선택 버튼 (회색)
  unclickedButtonStyle: `
	background:#d8d8d8;
		color:white;
		padding: 4px 15px 4px 15px;
    border: none;
		border-radius: 20px;
		outline:0px;
		text-decoration: none;
		cursor:pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #6f6eff;
		color: #fff;

  }
	`,
  //앨범 카드 스타일
  albumCardDiv: `
	width:150px;
	height:150px
	border-radius: 15px 15px 15px 15px;
	box-shadow: 0px 0px 5px #c8c8c8;
	`,
  //section 기본 스타일
  contentCardDiv: `
	width:100%;
	height:100%;
	border: 0px;
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;	`,
  // section title 기본 스타일
  contentTitle: `
	font-size:${fontSizes.xxxl};
	justify-content: start;
  margin-left: 15px;
  width: 100%;
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
	`,
  // 기본 Input 태그
  defaultInput: `
	border: none;
	border-bottom: 1px solid #bcbcbc;
	color:#bcbcbc;
	outline: none;
	&:focus{
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #6f6eff;
  }
    border-bottom: 2px solid #6f6eff;
    color: #6f6eff;;
	}
	`,
  // 기관설정 리스트
  listDiv: `
	width: 100%;
  height: 45%;
  margin: 0 auto;
  margin-bottom: 3%;
  border: 1px solid lightgray;
	border-radius: 12px;`,

  //기관설정 리스트 내 아이템
  itemInListDiv: `
	display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  align-items: center;
	margin-top: 3px;`,

  stateCardDiv: `
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
	`,
  avatarImageDiv: `
	width: 100%;
  height: 100%;
  object-fit: cover;
	`,
  stateDiv: `
	background:#6f6eff;
		font-size:1rem;
		color:white;
    border: none;
		border-radius: 5px;
		padding: 3px 10px 3px 10px;
	`,
  noticeCardDiv: `
	width:96%;
	height:60px;
	margin:0 auto;
	border-radius: 8px 8px 8px 8px;
	margin-top: 1%;
	margin-bottom: 2%;
	box-shadow: 0px 0px 5px #c8c8c8;
	`,
  defaultCardDiv: `
	widht:100%;
	height:100%;
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
	`,
};

const theme = {
  fontSizes,
  colors,
  common,
  device,
  deviceSizes,
};

export default theme;

//controller 
@Post()
  @ApiOperation({
    summary: 'notice 조회 및 글 등록',
    description:
      '이 API는 조회 및 글 작성 모두사용할 수 있습니다. body param으로 입력되는 값에 대한 명확한 정보를 확인 후 요청 부탁드립니다.',
  })
  create(@Body() notice: Notice) {
    return this.noticeService.create(notice);
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 조회',
    description: 'id 별 게시글 조회 API 입니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Notices })
  findById(@Param('id') id: string) {
    return this.noticeService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: 'id 별 게시글 수정 API 입니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: 'succeed' })
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제',
    description: 'id 별 게시글 삭제 API 입니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: 'succeed' })
  removeById(@Param('id') id: string) {
    //1. 조회를 한다
    //2. row가 없을 경우  error 를 리턴한다
    //3. row가 있을경우 삭제하고 결과를 반환한다.

    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
          error: 'id는 필수 입니다.',
        },
        HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
      );
    }
    return this.noticeService.removeById(+id);
  }
