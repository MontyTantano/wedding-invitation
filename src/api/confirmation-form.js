const TIMEOUT = 100

export default {
  sendForm: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
}
