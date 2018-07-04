function sortBy(attr, rev) {
  // rev = 1表示升序
  if (rev ==  undefined) {
    rev = 1;
  } else{
    rev = (rev > 0) ? 1 : -1;
  }
  return function(a,b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev;
    }
    return 0;
  }
}

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function getUrlParam(name) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if(r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

function getCourseNo() {
  // 通过设置get请求类似的来进行
  // temp = getUrlParam("courseNo");
  // if (temp && temp >= 0 && temp < courseData.length) {
  //   return getUrlParam("courseNo");
  // }
  // else {
  //   if (!temp) {
  //     appendGetUrl("courseNo", 0);
  //   }
  //   return 0;
  // }
  courseNo = window.localStorage.getItem('courseNo');
  if (courseNo && courseNo >= 0 && courseNo < courseData.length) {
    return courseNo;
  }
  window.localStorage.setItem('courseNo', 0);
  return 0;
}

function appendGetUrl(title, content) {
  if (window.location.href.indexOf("?") >= 0) {
    window.location.href += "&" + title + "=" + content;
  }
  else {
    window.location.href += "?" + title + "=" + content;
  }
}

function appendGetUrlText(title, content, text) {
  if (text.indexOf("?") >= 0) {
    return text + "&" + title + "=" + content;
  }
  else {
    return text + "?" + title + "=" + content;
  }
}

function tripUrlGet() {
  window.location.href = window.location.href.split("?")[0]
}

function urlGetSet(title, content) {
  window.location.href = appendGetUrlText(title, content, window.location.href.split("?")[0])
}

Vue.component('study-menu-item', {
  props: ['title', 'isSelected'],
  data: function() {
    if (this.isSelected == this.title) {
      return {
        selected: true
      }
    }
    else {
      return {
        selected: false
      }
    }
  },
  template:  `<li class="menu-item" v-bind:class="{ 'menu-selected': selected }">
                <a v-bind:href=" title + '.html' " class="menu-link">{{ $t(title) }}</a>
              </li>`
})
Vue.component('study-menu-divider', {
  template:  `<li class="menu-divider"></li>`
})
Vue.component('study-menu', {
  props: ['selected'],
//   template: 
//  `<div id="menu">
//     <div class="menu">
//     <p class="menu-heading">{{ $t("studyRoom") }}</p>
//     <ul class="menu-list">
//       <study-menu-item title='courses' v-bind:isSelected='selected'/>
//       <study-menu-divider/>
//       <study-menu-item title='notice' v-bind:isSelected='selected'/>
//       <study-menu-item title='information' v-bind:isSelected='selected'/>
//       <study-menu-item title='documents' v-bind:isSelected='selected'/>
//       <study-menu-item title='materials' v-bind:isSelected='selected'/>
//       <study-menu-item title='assignments' v-bind:isSelected='selected'/>
//     </ul>
//     </div>
//     <fh-translator></fh-translator>
//   </div>`,
  template: 
 `<div id="menu">
    <div class="menu">
    <p class="menu-heading">{{ $t("studyRoom") }}</p>
    <ul class="menu-list">
      <study-menu-item title='courses' v-bind:isSelected='selected'/>
      <study-menu-divider/>
      <study-menu-item title='notice' v-bind:isSelected='selected'/>
      <study-menu-item title='documents' v-bind:isSelected='selected'/>
    </ul>
    </div>
    <fh-translator></fh-translator>
  </div>`
})

function trZh() {
  this.i18n.locale='zh';
  window.localStorage.setItem("locale", 'zh');
}
function trEn() {
  // 注意这里是locale不是locate……
  this.i18n.locale='en';
  window.localStorage.setItem("locale", 'en');
}

Vue.component('fh-translator', {
  template: `<div id="translator"><a href="javascript:trZh()">中文</a> | <a href="javascript:trEn()">English</a></div>`
})

Vue.component('study-header', {
  props: ['title'],
  data: function() {
    // Chrome不支持本地静态网页的cookie……
    // 浪费青春……
    // document.cookie="courseNo=0";
    // 但是可以用loadStorage
    if(this.title) {
      return {
        name: null
      }
    }
    courseNo = getCourseNo();
    courseName = courseData[courseNo].name;
    return {
      name: courseName
    }
  },
  template: `
      <div class="header">
        <h1 v-if='name'>{{ name }}</h1>
        <h1 v-if='!name'>{{ $t(title) }}</h1>
      </div>`
})

Vue.component('study-footer', {
  template: `
<footer>
<div class='footer'>
  <br/>
  <span class="copyright">© <a href="http://www.fhao.top/">F.H.</a> 2018. <a href="https://github.com/fengh16">Github: fengh16</a>.</span>
</div>
</footer>`
})

Vue.component('study-notice-item', {
  props: ['noticedata'],
  data: function() {
    checked = "notice-" + getCourseNo() + "-" + this.noticedata.id;
    if (window.localStorage.getItem(checked)) {
      state = true;
    }
    else {
      state = false;
    }
    return {
      state: state
    }
  },
  methods: {
    temp: function(event) {
      window.localStorage.setItem("notice-" + getCourseNo() + "-" + this.noticedata.id, 1);
      urlGetSet("id", this.noticedata.id)
    },
  },
  template: `<tr>
  <td>{{ noticedata['id'] }}</td>
  <td v-on:click="temp" class="linker"><u>{{ noticedata['Heading'] }}</u></td>
  <td>{{ noticedata['Publisher'] }}</td>
  <td>{{ noticedata['PublishingTime'] }}</td>
  <td>{{ state? "已读": "未读" }}</td>
</tr>`
// 网络学堂没有翻译这个已读……我也不翻译了
})

Vue.component('study-notice', {
  props: ['type'],
  data: function() {
    detail = true;
    notices = courseData[getCourseNo()][this.type];
    for (i in notices) {
      checked = "notice-" + getCourseNo() + "-" + notices[i].id;
      if (window.localStorage.getItem(checked)) {
        notices[i].State = true;
      }
      else {
        notices[i].State = false;
      }
    }
    id = null;
    content = null;
    if (getUrlParam("id")) {
      gotten = false;
      for (i in notices) {
        if (getUrlParam("id") == notices[i].id) {
          detail = false;
          gotten = true;
          id = i;
          content = notices[id].Content.split("\n");
          break;
        }
      }
      if (!gotten) {
        tripUrlGet();
      }
    }
    titles = [];
    if (Object.keys(notices).length > 0) {
      titles = Object.keys(notices[Object.keys(notices)[0]]);
      titles.remove("Content");
    }
    return {
      notices: notices,
      detail: detail,
      id: id,
      content: content,
      sortInfo: "",
      titles: titles,
    }
  },
  methods: {
    back: function(event) {
      tripUrlGet();
    },
    sort: function(t) {
      if (this.sortInfo.split("-")[0] != t) {
        this.notices.sort(sortBy(t));
        this.sortInfo = t + "-";
      }
      else {
        if (this.sortInfo.split("-")[1] == "D") {
          this.notices.sort(sortBy(t));
          this.sortInfo = t + "-";
        }
        else {
          this.notices.sort(sortBy(t, -1));
          this.sortInfo = t + "-D";
        }
      }
    },
    show: function(t) {
      return this.sortInfo == t + "-";
    },
    showRev: function(t) {
      return this.sortInfo == t + "-D";
    }
  },
  template: `
  <div>
  <table v-if='detail'>
    <thead>
      <tr>
        <th class="linker" v-for="title in titles" v-on:click="sort(title)">{{$t(title)}}<span v-if="show(title)">{{ $t("Upward") }}</span><span v-if="showRev(title)">{{ $t("Downward") }}</span></th>
      </tr>
    </thead>
    <tbody>
    <study-notice-item v-for="notice in notices" :noticedata="notice" :key="notice.id"></study-notice-item>
    </tbody>
  </table>
  <div v-if='!detail'>
  <table>
    <thead>
      <tr>
        <th>{{$t('HeadingNotice')}}</th>
        <th>{{ notices[id].Heading }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{$t('content')}}</td>
        <td class="notice-content"><p v-for='text in content'>{{ text }}</p></td>
      </tr>
    </tbody>
  </table>
  <br>
  <div id='buttoncontainer'>
  <button v-on:click="back">返回</button>
  </div>
  </div>
  </div>`
})

Vue.component("study-courses", {
  data: function() {
    courses = [];
    for (i = 0; i < courseData.length; i++) {
      courses[i] = {};
      courses[i]['name'] = courseData[i].name;
      courses[i]['index'] = i;
    }
    return {
      courses: courses
    }
  },
  methods: {
    turn: function(key) {
      window.localStorage.setItem('courseNo', key);
      window.location.href = "notice.html";
    },
  },
  template: `
  <ul class="courses">
    <li v-for="item in courses" v-on:click="turn(item.index)" class="linker">
      {{ item.name }}
    </li>
  </ul>`
})

Vue.component('study-files-item', {
  props: ['noticedata'],
  methods: {
    state: function(t) {
      checked = "files-" + getCourseNo() + "-" + this.noticedata.Path;
      if (window.localStorage.getItem(checked)) {
        return true;
      }
      else {
        return false;
      }
    },
    temp: function(t) {
      window.localStorage.setItem("files-" + getCourseNo() + "-" + this.noticedata['Path'], 1);
    },
    fileSize: function(event) {
      size = this.noticedata.size;
      fileSize = "B";
      // 网络学堂里面应该是这样判断的吧……会出现0.9的情况
      if (size > 1000) {
        size /= 1024;
        fileSize = "KB";
      }
      if (size > 1000) {
        size /= 1024;
        fileSize = "MB";
      }
      if (size > 1000) {
        size /= 1024;
        fileSize = "GB";
      }
      if (size > 1000) {
        size /= 1024;
        fileSize = "TB";
      }
      return size.toFixed(1) + fileSize;
    },
  },
  template: `<tr>
  <td>{{ noticedata['id'] }}</td>
  <td><a v-bind:href="'files/'+noticedata['Path']" v-bind:download="noticedata['Path']" v-on:click="temp(noticedata['id'])">{{ noticedata['FileHeading'] }}</a></td>
  <td>{{ noticedata['BriefExplanation'] }}</td>
  <td>{{ fileSize() }}</td>
  <td>{{ noticedata['Time'] }}</td>
  <td>{{ state()? "": $t("newfile") }}</td>
</tr>`
})

Vue.component('study-documents', {
  props: ['type'],
  data: function() {
    notices = courseData[getCourseNo()][this.type];
    folders = Object.keys(notices);
    selected = folders[0];
    titles = [];
    if (Object.keys(notices).length > 0) {
      titles = Object.keys(notices[folders[0]][Object.keys(notices[folders[0]])[0]]);
      titles.remove("Path");
    }
    // 否则会在后面pop的时候影响原数组
    files = JSON.parse(JSON.stringify(notices[selected]));
    return {
      notices: notices,
      folders: folders,
      sortInfo: "",
      titles: titles,
      selected: selected,
      files: files,
    }
  },
  methods: {
    sort: function(t) {
      if (t == "FileState") {
        return;
      }
      if (this.sortInfo.split("-")[0] != t) {
        this.files.sort(sortBy(t));
        this.sortInfo = t + "-";
      }
      else {
        if (this.sortInfo.split("-")[1] == "D") {
          this.files.sort(sortBy(t));
          this.sortInfo = t + "-";
        }
        else {
          this.files.sort(sortBy(t, -1));
          this.sortInfo = t + "-D";
        }
      }
    },
    show: function(t) {
      return this.sortInfo == t + "-";
    },
    showRev: function(t) {
      return this.sortInfo == t + "-D";
    },
    isSelected: function(t) {
      return t == this.selected;
    },
    setSelected: function(t) {
      this.selected = t;
      this.sortInfo = "";
      while (this.files.length > 0) {
        this.files.pop();
      }
      newFiles = JSON.parse(JSON.stringify(this.notices[this.selected]));
      for (i = 0; i < newFiles.length; i++) {
        this.files.push(newFiles[i]);
      }
    },
    useLinker: function(t) {
      return t!="FileState"
    }
  },
  template: `
  <div>
  <button v-for="folder in folders" class="tags" v-bind:class="{ selected: isSelected(folder) }" v-on:click="setSelected(folder)">{{folder}}</button>
  <table class="no-margin-top">
    <thead>
      <tr>
        <th v-for="title in titles" v-bind:class="{ linker: useLinker(title) }" v-on:click="sort(title)">{{$t(title)}}<span v-if="show(title)">{{ $t("Upward") }}</span><span v-if="showRev(title)">{{ $t("Downward") }}</span></th>
      </tr>
    </thead>
    <tbody>
    <study-files-item v-for="notice in files" :noticedata="notice" :key="notice.id"></study-files-item>
    </tbody>
  </table>
  </div>`
})

var app = new Vue({
  el: '#app',
  data: { },
  i18n
})