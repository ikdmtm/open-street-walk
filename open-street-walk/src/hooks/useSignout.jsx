import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export const useSignout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  //ログアウトの処理
  const authSignout = async (setNotice, setAlert) => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/sign_out";
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
        throw new Error("ログアウトに失敗");
      }
      //ログアウト成功でクッキーの削除
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      //ログイン状態の変更
      setIsLogin(false);
      setNotice("ログアウトに成功しました");
      console.log("success: ログアウトに成功");
      router.push("/"); //redirect
    } catch (error) {
      console.error(error);
      setAlert("ログアウトに失敗しました");
      //ログアウト失敗で何もしない
    }
  };
  return { isLogin, setIsLogin, authSignout };
};
