import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useCreatePin = () => {
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleChangeLat = useCallback((e) => {
    setLat(e.target.value);
  }, []);

  const handleChangeLng = useCallback((e) => {
    setLng(e.target.value);
  }, []);

  const handleChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleChangeFile = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  console.log(title, lat, lng, imageFile);

  const createFormData = async () => {
    const formData = new FormData();
    formData.set("pin[title]", `${title}`);
    formData.set("pin[lat]", lat);
    formData.set("pin[lng]", lng);
    formData.set("pin[image]", imageFile);
    return formData;
  };

  // const formData = new FormData();
  // formData.("title", title);
  // formData.set("lat", lat);
  // formData.set("lng", lng);
  // formData.set("image", imageFile);

  // for (let d of formData) {
  //   console.log(`${d[0]}: ${d[1]}`);
  // }

  //ピンをデータベースに保存
  const createPin = async () => {
    const url = "http://localhost:3000/pins";
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
      //Map表示用のstate、新規作成を違うページでやるならいらない
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
  };

  return {
    title,
    lat,
    lng,
    imageFile,
    handleChangeTitle,
    handleChangeLat,
    handleChangeLng,
    handleChangeFile,
    createPin,
  };
};
