# קופת היומי

אפליקציית שולחן עבודה (Electron) עבור `app/index.html`.

הנתונים נשמרים בקובץ: `Documents\קופת היומי\נתונים.json` (עם גיבוי אוטומטי של הגרסה הקודמת).

## בנייה אוטומטית ב-GitHub
1. העלה את כל התיקייה לריפוזיטורי חדש.
2. היכנס ללשונית **Actions** ← **Build Windows EXE** ← **Run workflow**.
3. בסיום, הורד את הקובץ מתוך **Artifacts** (קובץ portable + מתקין).

לפרסום ב-Releases: צור תג, למשל `git tag v1.0.0 && git push --tags`.

## בנייה מקומית
```
npm install
npm start      # הרצה לבדיקה
npm run dist   # בניית EXE לתיקיית dist
```

אייקון (אופציונלי): הוסף `build/icon.ico` (256x256).
