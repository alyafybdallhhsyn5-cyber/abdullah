# مشروع: تاريخ وحاضر الشرق الأوسط (تطبيق متكامل)
**تصميم وتطوير: عبدالله حسين (@n.0a21)**

تطبيق ويب تقدمي وتفاعلي (PWA & Full-Stack) يوثق تاريخ وحاضر دول الشرق الأوسط، العلاقات الثنائية، الحروب والتحالفات التاريخية، مع نظام اختبارات تفاعلي (تحدي المؤرخ)، حفظ سحابي للمفضلة ونتائج الاختبارات عبر Cloud SQL (PostgreSQL) وFirebase Auth.

---

## 🚀 كيفية تشغيل المشروع على جهازك (Local Development)

### المتطلبات الأساسية:
- تثبيت [Node.js](https://nodejs.org) (إصدار 18 أو أحدث)
- متصفح ويب حديث (Google Chrome, Firefox, Safari, Edge)

### خطوات التشغيل:
1. فك ضغط هذا الملف `ZIP` على جهازك في مجلد خاص.
2. افتح مجلد المشروع في برنامج **Visual Studio Code** أو سطر الأوامر (Terminal).
3. قم بتثبيت حزم الـ NPM بالكامل عبر كتابة الأمر:
   ```bash
   npm install
   ```
4. لتشغيل خادم التطوير التفاعلي:
   ```bash
   npm run dev
   ```
5. افتح الرابط في المتصفح:
   `http://localhost:3000`

---

## 📂 هيكلية ملفات المشروع (Project Structure)

```text
├── index.html                   # صفحة الدخول الرئيسية مع وسوم PWA و SEO والخطوط العربية
├── server.ts                    # خادم Node.js / Express مع تكامل Cloud SQL و Firebase
├── package.json                 # الحزم والتبعيات والمكتبات المستخدمة
├── tsconfig.json                # إعدادات لغة TypeScript
├── vite.config.ts               # إعدادات منصة البناء السريع Vite
├── metadata.json                # بيانات التطبيق وهوية المشروع
├── public/                      # الملحقات الثابتة
│   ├── icon.svg                 # أيقونة التطبيق الذهبية المعتمدة
│   └── manifest.json            # ملف إعدادات PWA لتثبيت التطبيق على الهواتف
└── src/                         # كود المصدر البرمجي
    ├── main.tsx                 # نقطة الانطلاق الرئيسية
    ├── App.tsx                  # المكون الأساسي وإدارة الشاشات
    ├── index.css                # أنماط Tailwind CSS والخطوط العربية
    ├── components/              # مكونات الواجهة التفاعلية
    │   ├── HistoryNavbar.tsx    # شريط التنقل العلوي وتنزيل الكود والحساب
    │   ├── MiddleEastMap.tsx    # خريطة الشرق الأوسط التفاعلية
    │   ├── CountryDossier.tsx   # ملفات الدول التفصيلية
    │   ├── RelationsSection.tsx # العلاقات الثنائية والتاريخ المشترك
    │   ├── WarsSection.tsx      # سجل الحروب والتحالفات والصراعات
    │   ├── HistorianQuiz.tsx    # اختبار المؤرخ التفاعلي مع حفظ السكور
    │   ├── UserProfileModal.tsx # الملف الشخصي للمستخدم والمحفوظات السحابية
    │   ├── InstallAppModal.tsx  # دليل تحويل المشروع لتطبيق APK وتنزيل الكود
    │   ├── CompareModal.tsx     # مقارنة دولتين جنباً إلى جنب
    │   └── DesignerModal.tsx    # نبذة المصمم عبدالله حسين
    ├── data/                    # البيانات التاريخية والجغرافية الموسوعية
    │   └── middleEastData.ts
    ├── db/                      # إعدادات ومخطط قاعدة بيانات Cloud SQL (PostgreSQL)
    │   ├── schema.ts            # جداول users, bookmarks, quiz_scores عبر Drizzle ORM
    │   ├── index.ts             # اتصال قاعدة البيانات
    │   └── drizzle.config.ts    # إعدادات Drizzle
    ├── contexts/                # سياق المصادقة وتسجيل الدخول عبر Firebase
    │   └── AuthContext.tsx
    └── utils/                   # دوال مساعدة والصوتيات
        └── audio.ts             # المؤثرات الصوتية Web Audio API
```

---

## 📱 تحويل المشروع إلى تطبيق أندرويد (APK):
يمكنك تحويل هذا المشروع إلى ملف تطبيق هاتف حقيقي `.apk` عبر:
1. التثبيت المباشر من المتصفح (PWA): افتح الرابط في Chrome واضغط على النقاط الثلاث واختر **"إضافة إلى الشاشة الرئيسية"**.
2. تصدير ملف APK مجاناً بدون كود عبر [PWABuilder.com](https://www.pwabuilder.com) بمجرد وضع رابط موقعك والضغط على **Package for Android**.

---
**حقوق التصميم والتطوير محفوظة للمصمم عبدالله حسين (@n.0a21)**
