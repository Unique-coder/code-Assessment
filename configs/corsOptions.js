const whiteList = ['http://localhost:5173', 'http://localhost:3000'];

export const corsOptions = {
  origin: whiteList,
  credentials: true,
  methods: 'POST,GET,PATCH,DELETE',
};
