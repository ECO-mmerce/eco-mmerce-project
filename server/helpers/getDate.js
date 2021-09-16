module.exports = function() {
  const now = new Date()
  let date = now.getDate() + ""
  let month = now.getMonth() + 1 + ""
  let year = now.getFullYear()
  let hour = now.getHours() + ""
  let minute = now.getMinutes() + ""
  let second = now.getSeconds() + ""

  if (date.length < 2) date = "0" + date
  if (month.length < 2) month = "0" + month
  if (hour.length < 2) hour = "0" + hour
  if (minute.length < 2) minute = "0" + minute
  if (second.length < 2) second = "0" + second

  return [hour, minute, second, date, month, year].join("-")
}