<template>
  <div class="row">
    <main class="col-12">
      <h2>Заповніть форму для реєстрації</h2>
      <form id="dataForm" @submit.prevent="addStudent">
        <label>Email:
          <input type="email" id="email" name="email" required v-model="email">
        </label><br>
        <label>Пароль:</label>
        <input type="password" id="password" name="password" required v-model="password" @input="checkPassword">
        <p id="passwordAlert" v-if="errorPassword">Пароль має починатися з великої літери та написаний латиницею. Може
          містити
          цифри. Довжина - від 6 до 20 символів</p><br>
        <label>Прізвище:
          <input type="text" id="surname" name="surname" required v-model="surname" @input="checkSurname">
        </label>
        <p id="surnameAlert" v-if="errorSurname">Прізвище має бути написане з великої літери українською,
          мінімум 2 букви</p><br>
        <label>Ім'я:
          <input type="text" id="name" name="name" required v-model="name" @input="checkName">
        </label>
        <p id="nameAlert" v-if="errorName">Ім'я має бути написане з великої літери українською,
          мінімум 2 букви</p><br>
        <label>По-батькові:
          <input type="text" id="secondName" name="secondName" required v-model="secondName" @input="checkSecondName">
        </label>
        <p id="secondNameAlert" v-if="errorSecondName">Ім'я по-батькові має бути написане з великої літери
          українською, мінімум 2 букви</p><br>
        <label>Дата народження:
          <input type="date" id="birthDate" name="birthDate" required v-model="birthDate" @input="checkDate">
        </label>
        <p id="dateAlert" v-if="errorBirthDate">Ваш вік має бути 16+ на даний момент</p><br>
        <label>Номер телефону:
          <input type="text" id="phone" name="phone" class="phone form-control" required v-model="phone"
                 placeholder="+38(0__)___-__-__"
                 v-mask="'+38(0##)###-##-##'"
                 @input="checkPhone">
        </label>
        <p id="phoneAlert" v-if="errorPhone">Введіть повний номер телефону</p><br>
        <p>Стать:</p>
        <label>
          <input type="radio" name="sex" value="Жінка" required v-model="sex">Жінка
        </label><br>
        <label>
          <input type="radio" name="sex" value="Чоловік" required v-model="sex">Чоловік
        </label><br>
        <label>
          <input type="radio" name="sex" value="Небінарна особистість" required v-model="sex">Небінарна особистість
        </label><br>
        <br>
        <label>Група:
          <select id="group" required v-model="group">
            <option name="ia11" value="ІА-11">ІА-11</option>
            <option name="ia12" value="ІА-12">ІА-12</option>
            <option name="ia13" value="ІА-13">ІА-13</option>
            <option name="ia14" value="ІА-14">ІА-14</option>
          </select>
        </label><br><br>
        <div id="divButton">
          <input type="submit" value="Підтвердити" class="butt" id="subm">
        </div>
      </form>

      <div class="scroll">
        <table id="dataTable">
          <tr>
            <td id="genCheckbox">Вибір</td>
            <td>Прізвище</td>
            <td>Ім'я</td>
            <td>По-батькові</td>
            <td>Email</td>
            <td>Дата народження</td>
            <td>Номер телефону</td>
            <td>Стать</td>
            <td>Група</td>
          </tr>
          <tr v-for="(student, i) in studentData">
            <th scope="row"><input type="checkbox" v-model="checkbox" :value="i"></th>
            <td>{{ student.surname }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.secondName }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.birthDate }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.sex }}</td>
            <td>{{ student.group }}</td>
          </tr>
        </table>
      </div>
      <br>
      <div class="butt-2">
        <input type="button" id="delete" value="Видалити" @click="deleteRow">
        <input type="button" id="duplicate" value="Дублювати" @click="duplicateRow">
      </div>
    </main>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css'
import {mask} from 'vue-the-mask'


export default defineComponent({
  props: {
    //Реквізити - https://ua.vuejs.org/guide/components/props.html#props-declaration
  },
  components: {
    //Локальна реєстрація компонентів
    // https://ua.vuejs.org/guide/components/registration.html#local-registration
    vSelect,
  },
  directives: {
    //Локальна реєстрація директив
    mask
  },
  data: () => ({
    //змінні компонету
    checkbox: [],
    email: '',
    password: '',
    surname: '',
    name: '',
    secondName: '',
    phone: '',
    birthDate: '',
    sex: '',
    group: '',
    studentData: [],
    errorPassword: false,
    errorName: false,
    errorSurname: false,
    errorSecondName: false,
    errorBirthDate: false,
    errorPhone: false
  }),
  watch: {
    //Спостерігачі
    // variableName: function (variableVale) {
    //   //більш детально https://ua.vuejs.org/guide/essentials/watchers.html#base-example
    // }
  },
  methods: {

    addStudent: function (event) {
      let result = !this.errorPassword && !this.errorBirthDate && !this.errorPhone && !this.errorSurname
          && !this.errorName && !this.errorSecondName;
      if (result) {
        this.studentData.push({
          surname: this.surname,
          name: this.name,
          secondName: this.secondName,
          email: this.email,
          birthDate: this.birthDate,
          phone: this.phone,
          sex: this.sex,
          group: this.group,
        })
        this.clearForm();
      }
      else alert('Ви ввели неправильні дані!');
    },
    clearForm() {
      this.surname = '';
      this.name = '';
      this.secondName = '';
      this.email = '';
      this.birthDate = '';
      this.phone = '';
      this.sex = '';
      this.group = '';
      this.password = '';
    },

    deleteRow() {
      let checks = this.checkbox;
      for (let i = checks.length - 1; i >= 0; i--) {
        let check = checks[i];
        this.studentData.splice(check, 1);
        this.checkbox.splice(i, 1)
      }
    },

    duplicateRow() {
      let checks = this.checkbox;
      for (let i = checks.length - 1; i >= 0; i--) {
        let check = checks[i];
        this.studentData.push(this.studentData[check]);
      }
    },

    checkPassword() {
      this.errorPassword = !/^[A-Z][a-zA-Z0-9]{5,20}$/.test(this.password);
    },

    checkDate() {
      let dateJS = new Date(this.birthDate);
      let gendate = new Date();
      let currentDate = new Date(gendate.getFullYear() + "-" + (gendate.getMonth() + 1) + "-" + gendate.getDate());
      const diffTime = Math.abs(currentDate - dateJS);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 5844 && gendate.getTime() > dateJS.getTime())
        this.errorBirthDate = false;
      else this.errorBirthDate = true;
    },

    checkName() {
      this.errorName = !/^[А-ЯЇІЄҐ][а-яїієґ']+$/.test(this.name);
    },
    checkSurname() {
      this.errorSurname = !/^[А-ЯЇІЄҐ][а-яїієґ']+$/.test(this.surname);
    },
    checkSecondName() {
      this.errorSecondName = !/^[А-ЯЇІЄҐ][а-яїієґ']+$/.test(this.secondName);
    },
    checkPhone() {
      this.errorPhone = this.phone.length !== 17;
    }
  }
})
</script>

<style>
* {
  box-sizing: border-box;
}

main {
  text-align: center;
}

main ul, main li {
  text-align: center;
}

a:link {
  color: black;
  text-decoration: none;
}

a:visited {
  color: black;
}

::selection {
  background-color: black;
  color: silver;
}

table {
  border-spacing: 0;
  width: 100%;
  border: 1px solid #8a8a8a;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:first-child {
  font-weight: bold;
}

tr:nth-child(odd) {
  background-color: rgba(192, 192, 192, 0.45);
}

.scroll {
  overflow-x: auto;
}

form {
  text-align: center;
  font-size: 20px;
}

form input {
  margin-bottom: 15px;
}

#subm {
  font-size: 20px;
  background-color: #9b9b9b;
  color: white;
  border-radius: 10px 4px;
  border-color: #4f4f4f;
}

#surnameAlert, #nameAlert, #secondNameAlert, #passwordAlert, #dateAlert, #phoneAlert {
  color: red;
}

#delete, #duplicate {
  font-size: 17px;
  background-color: #9b9b9b;
  color: white;
  border-radius: 10px 4px;
  border-color: #4f4f4f;
  margin: 5px 15px;
}
</style>