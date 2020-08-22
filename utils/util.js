const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate2: function(t) {
    return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日";
  },
  randomNum: function(t, e) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * t + 1, 10);

      case 2:
        return parseInt(Math.random() * (e - t + 1) + t, 10);

      default:
        return 0;
    }
  }

}