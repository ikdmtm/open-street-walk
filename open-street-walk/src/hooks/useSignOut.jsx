import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useSignOut = (props) => {
  const router = useRouter();
  //ログアウトの処理
  const url = "http://localhost:3000/auth/sign_out";
  const authSignOut = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "uid": Cookies.get("uid"),
        "client": Cookies.get("client"),
        "access-token": Cookies.get("access-token"),
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to sign out user from API");
      }
      console.log("Success: user has signed out.");
      //ログアウト成功でクッキーの削除
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      //ログイン状態の変更
      props.setIsLogin(false);
      console.log("success", Cookies.get("uid"));
      router.push("/"); //redirect
    } catch (error) {
      console.error(error);
      //ログアウト失敗で何もしない
    }
  };
  return { authSignOut };
};
