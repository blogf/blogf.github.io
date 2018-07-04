Vue.use(VueI18n)

// Ready translated locale messages
const messages = {
  zh: {
    studyRoom: '网络学堂',
    courses: '所有课程',
    notice: '课程公告',
    information: '课程信息',
    documents: '课程文件',
    materials: '教学资源',
    assignments: '课程作业',

    id: '序号',
    Heading:	'公告标题',
    Publisher: '发布者',
    PublishingTime: '发布时间',
    State: '公告状态',

    HeadingNotice: "标题",
    content: '正文',

    Upward: '（升）',
    Downward: '（降）',

    FileHeading: '标题',
    BriefExplanation: '简要说明',
    size: '文件大小',
    Time: '上载时间',
    FileState: '状态',

    newfile: '新文件',
  },
  en: {
    studyRoom: 'Study',
    courses: 'Courses',
    notice: 'Notice',
    information: 'Information',
    documents: 'Documents',
    materials: 'Materials',
    assignments: 'Assignments',

    id: 'Sequence number',
    Heading:	'Heading of the notice',
    Publisher: 'Publisher',
    PublishingTime: 'Publising time',
    State: 'State',

    HeadingNotice: "Heading",
    content: 'Text',

    Upward: '(Ascend)',
    Downward: '(descend)',

    FileHeading: 'Heading',
    BriefExplanation: 'Brief explanation',
    size: 'Size of the file',
    Time: 'Uploading time',
    FileState: 'State',

    newfile: 'new file',
  }
}

locale = window.localStorage.getItem("locale");
if (!locale || !(locale in messages)) {
  window.localStorage.setItem("locale", 'zh');
  locale = 'zh';
}

i18n = new VueI18n({
  locale: locale, // set locale
  fallbackLocale: 'zh',
  messages, // set locale messages
})