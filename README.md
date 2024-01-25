# 코딩허브 과제

안녕하세요! 이번 코딩허브의 기업 과제를 진행했습니다. 열심히 만들었으니 잘 부탁 드립니다 😃

![GitHub issues](https://img.shields.io/github/issues/tangjinlog/JSJ_WikiPage?color=limegreen)
<img src="https://img.shields.io/badge/commits-59-3" />

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



<p align="left">
<img width="400" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/209daf04-c7db-4137-9fac-ab93516c7d83">
<img width="400" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/2905eeb3-72b1-4ca2-b376-aae7d8607eb1">
</p>

사용자가 실수로 위키 작성중, 페이지를 이탈하는 상황을 방지하기위해, `Confirm Modal`을 추가했습니다.<br>추가로, 작성중인 상태에서 새로고침시에도 한번 더 확인하도록 구현했습니다.

#### 컨펌 모달 전략

기본적으로 `useRouteControl` 훅을 사용하는 path에서 다른 페이지로 routing 시도할 경우에 띄워집니다.<br>
`useKeyDown` 훅이 **Esc** 키를 감지해서 사용자는 모달을 **Esc** 키를 눌러 닫을 수 있습니다. 

- 모달 생성 시나리오

  - `/wiki?tab=wiki&create=true` 페이지에서 사용자가 한 글자라도 입력했을 경우(위키 제목, 위키 내용 둘다 해당)
  - `/wiki?tab=wiki&id=위키번호` 페이지에서 수정 중인 경우(위키 생성과 다르게 위키 제목, 위키 내용이 둘다 빈칸이여도 모달 생성)

- 모달 방지 시나리오
  - `/wiki?tab=wiki&create=true` 페이지에서 제목, 내용이 둘 다 빈칸일 경우


#### ErrorBoundary

<img width="300" alt="image" src="https://github.com/tangjinlog/JSJ_WikiPage/assets/96574345/da7f4b3f-a571-488b-9a08-e8fb414d13ca">(json-server를 끄면 볼 수 있습니다)

컴포넌트 가장 바깥에 둔 `GlobalErrorBoundary` 와 각 api 요청에 대한 책임만 가지는 Fetcher 컴포넌트를 감싸는 `ApiErrorBoundary`를 두어 에러를 핸들링함으로써 앱의 안정성을 높혔습니다.

감사합니다! 😃
