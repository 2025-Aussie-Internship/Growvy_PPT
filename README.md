# Growvy PPT Slideshow

Growvy 프레젠테이션 PDF를 브라우저에서 자동 재생하는 웹 뷰어입니다.  
별도 프로그램 없이 링크만으로 슬라이드를 순환 재생할 수 있습니다.

## 배포 링크

**https://growvyppt.vercel.app**

## 주요 기능

- 슬라이드 **5초** 간격 자동 재생
- 우측 상단 토글로 **한국어 / 영어** 전환
- 언어를 바꿔도 **현재 페이지 유지**
- 마지막 슬라이드 이후 첫 슬라이드로 반복

## 사용 파일

| 언어 | 파일 |
|------|------|
| 한국어 | `growvy_ppt_ko.pdf` |
| 영어 | `growvy_ppt_en.pdf` |

PDF 파일은 `public/` 폴더에 위치합니다.

## 기술 스택

- React + TypeScript + Vite
- react-pdf
- styled-components
- zustand

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

## 배포

Vercel 기준:

```bash
npm run build
npx vercel --prod
```

빌드 시 `public/` 폴더의 PDF가 `dist/`에 함께 포함됩니다.
