# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



작업 과정
2023.05.15
- npx create-react-app cool-emoticon --template typescript
- 코드 초기화 (필요 없는 기본 스타일, 로직 제거)
- 폴더 구조 구성
- styled-components 설치 : npm i styled-components, npm i @types/styled-components
- --> 이슈 : styled-components 설치 오류, @5.3.10 버전으로 설치
- react-router-dom 설치 : npm i react-router-dom
- Router.tsx 파일 생성 / 적용
- theme.ts 파일 생성 / 적용
2023.05.16
- 해더 (메뉴, 로고, 검색)
- nav
- framer-motion 적용 (애니메이션 위함)
- recoil 적용 (상태관리)
2023.05.17
- 매인 배너 (테스트용)
- 최신 이모티콘 배너
- 스타일 이모티콘 배너
- react-query 데이터 호출
- framer-motion : 슬라이더 애니메이션
- recoil : 이모티콘 데이터 상태 관리
- 슬라이더 컴포넌트화