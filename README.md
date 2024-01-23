# 코딩허브 과제

안녕하세요! 이번 코딩허브의 기업 과제를 진행했습니다. 열심히 만들었으니 잘 부탁 드립니다 😃

![GitHub issues](https://img.shields.io/github/issues/tangjinlog/JSJ_WikiPage?color=limegreen)
<img src="https://img.shields.io/badge/commits-56-3" />

## Stack
<p align="left">
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" width="20%"/>
	<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" width="20%"/>
 	<img src="https://img.shields.io/badge/TailwindCSS-5FC69A?style=flat&logo=tailwindcss&logoColor=white" width="20%"/>
	<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=white" width="20%"/>
</p>





## 실행 커맨드

```bash
# clone
git clone https://github.com/tangjinlog/JSJ_WikiPage.git

cd JSJ_WikiPage

yarn

# Node.js version >= v18.17.0 is required
yarn dev

# 기본 서버 실행
yarn server
```
기획 및 구상은 `Flunti`를 바탕으로 진행하면서, 강의에 관한 정보를 모아 볼 수 있는 플레이어 일체형 **WikiPage**를 구현했습니다.

## Detail

### Atomic Design Pattern
<img width="236" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/df800f50-3464-48dd-9b0e-83d8e198588e">

컴포넌트의 재사용성과 유지보수를 고려해 아토믹 디자인 패턴으로 설계했습니다.<br>

### Pages
<p align="left">
	<img width="500" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/bdda3c58-1569-4274-9fa9-cdfef9780f03">
	<img width="500" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/e98c3a23-f88c-4c34-8fb3-a86444b86ec9">
	<img width="700" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/4baa27a7-c3b1-4702-973d-ed658c4c1b13">
	<img width="250" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/417df4c2-31d3-41c6-992f-fb2a86401a06">
</p>

### Feature
<p align="left">
<img width="400" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/f2c88f5b-302e-425c-8349-d9858f5b9aba">
<img width="400" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/d855fb8a-326b-4b4b-92b9-8f9f9df82a63">
</p>

768px 아래로 viewport가 줄어들면, `tab`바 위치가 아래로 변경되도록 반응형으로 설계했습니다.

<img width="300" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/da7f4b3f-a571-488b-9a08-e8fb414d13ca">(json-server를 끄면 볼 수 있습니다)


컴포넌트 가장 바깥에 둔 `GlobalErrorBoundary` 와 각 api 요청에 대한 책임만 가지는 Fetcher 컴포넌트를 감싸는 `ApiErrorBoundary`를 두어 에러를 핸들링함으로써 앱의 안정성을 높혔습니다.

감사합니다! 😃
