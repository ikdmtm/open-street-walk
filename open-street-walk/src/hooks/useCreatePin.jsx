import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useCreatePin = () => {
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChangeLat = useCallback((e) => {
    setLat(e.target.value);
  }, []);

  const handleChangeLng = useCallback((e) => {
    setLng(e.target.value);
  }, []);

  const handleChangeTitle = useCallback((e) => {
    if (e.target.value.length <= 25) {
      setTitle(e.target.value);
    } else {
      setErrorMessage("タイトルは25文字以内");
      console.log("タイトルは25文字以内");
    }
  }, []);

  const handleChangeFile = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  console.log(title, lat, lng, imageFile, errorMessage);

  const createFormData = async () => {
    const formData = new FormData();
    formData.set("pin[title]", `${title}`);
    formData.set("pin[lat]", lat);
    formData.set("pin[lng]", lng);
    formData.set("pin[image]", imageFile);
    return formData;
  };

  //ピンをデータベースに保存
  const createPin = async () => {
    if (title && lat && lng && imageFile) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}` + "/pins";
      const data = await createFormData();
      const options = {
        method: "POST",
        headers: {
          "uid": Cookies.get("uid"),
          "client": Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        },
        body: data,
      };
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error("ピンの作成に失敗");
        }
        const data = await res.json();
        console.log("Success: ピンの作成に成功", data);
        //ピン追加で即Mapに表示する用のstate、新規作成を違うページでやるならいらない
        // const createdPin = [title, lat, lng];
        // props.setPins((prevPins) => {
        //   return [...prevPins, createdPin];
        // });
        //保存成功でinputのリセット
        setLat("");
        setLng("");
        setTitle("");
        setImageFile(null);
        router.push("/"); //redirect
      } catch (error) {
        console.error(error);
        //pinの作成失敗
      }
    } else {
      setErrorMessage("入力に誤りがあります");
    }
  };

  //現在地の緯度経度を取得
  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }, []);

  return {
    title,
    lat,
    lng,
    imageFile,
    errorMessage,
    handleChangeTitle,
    handleChangeLat,
    handleChangeLng,
    handleChangeFile,
    createPin,
    handleGetLocation,
  };
};
