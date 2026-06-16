# Growvy PPT Slideshow

PDF 프레젠테이션을 3초마다 자동으로 넘기는 웹 뷰어입니다.

## 실행

```bash
npm install
npm run dev
```

## 배포 (Vercel)

```bash
npm install
npm run build
npx vercel login   # 최초 1회
npx vercel --prod  # 프로덕션 배포
```

`public/` 폴더의 PDF가 빌드 결과물(`dist/`)에 포함됩니다.
