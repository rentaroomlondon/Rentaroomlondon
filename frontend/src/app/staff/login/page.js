import Login from "./component/Login";

// 🔒 BLOCK INDEXING
export const metadata = {
  title: "Staff Login",

  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <Login />;
}