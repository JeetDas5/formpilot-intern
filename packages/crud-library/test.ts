import {prisma} from "../database/src/index";

const test = async () => {
  const user = await prisma.user.findUnique({
    where: { email: "jeetdas1508@gmail.com" },
  });
  console.log(user);
};

test();
