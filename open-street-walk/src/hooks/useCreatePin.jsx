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

  //緯度-90~90, 経度-180~180, lat, lang
  const handleChangeLat = useCallback((e) => {
    const defaultLat = e.target.value;
    const limitedLat0 = parseInt(defaultLat.split(".")[0]); // 整数部分を取得
    const limitedLat1 = defaultLat.split(".")[1]; // 小数点以下の部分を文字列として取得し、小数点に変換（小数点以下がない場合は0をセット）
    const limitedLat2 = parseFloat(`0.${defaultLat.split(".")[1] || "0"}`);
    const limitedLat = limitedLat0 + limitedLat2; // 整数部分と小数点以下を合わせる

    if (limitedLat > -90 && limitedLat < 90) {
      if (limitedLat1) {
        if (limitedLat1.length <= 6) {
          setLat(limitedLat);
          setErrorMessage(""); // エラーメッセージをクリア
        } else {
          setLat((prevLat) => prevLat);
          setErrorMessage("緯度は小数点以下6桁までにしてください");
        }
      } else {
        setLat(limitedLat0);
        setErrorMessage("");
      }
    } else {
      setLat("");
      setErrorMessage("緯度は-90から90の間にしてください"); // エラーメッセージを設定
    }
  }, []);

  const handleChangeLng = useCallback((e) => {
    const defaultLng = e.target.value;
    const limitedLng0 = parseInt(defaultLng.split(".")[0]); // 整数部分を取得
    const limitedLng1 = defaultLng.split(".")[1]; // 小数点以下の部分を文字列として取得し、小数点に変換（小数点以下がない場合は0をセット）
    const limitedLng2 = parseFloat(`0.${defaultLng.split(".")[1] || "0"}`);
    const limitedLng = limitedLng0 + limitedLng2; // 整数部分と小数点以下を合わせる
    if (limitedLng > -180 && limitedLng < 180) {
      if (limitedLng1) {
        if (limitedLng1.length <= 6) {
          setLng(limitedLng);
          setErrorMessage(""); // エラーメッセージをクリア
        } else {
          setLng((prevLng) => prevLng);
          setErrorMessage("経度は小数点以下6桁までにしてください");
        }
      } else {
        setLng(limitedLng0);
        setErrorMessage("");
      }
    } else {
      setLng("");
      setErrorMessage("経度は-180から180の間にしてください"); // エラーメッセージを設定
    }
  }, []);

  const handleChangeTitle = useCallback((e) => {
    if (e.target.value.length <= 25) {
      setTitle(e.target.value);
    } else {
      setTitle((prevTitle) => prevTitle);
      setErrorMessage("タイトルは25文字以内にしてください");
      console.log("タイトルは25文字以内にしてください");
    }
  }, []);

  const handleChangeFile = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  console.log(title, lat, lng, imageFile, errorMessage);

  const createFormData = async () => {
    const formData = new FormData();
    formData.set("pin[title]", title);
    formData.set("pin[lat]", lat);
    formData.set("pin[lng]", lng);
    formData.set("pin[image]", imageFile);
    return formData;
  };

  //ピンをデータベースに保存
  const createPin = async (setNotice, setAlert) => {
    if (title && lat && lng && imageFile) {
      const url = process.env.NEXT_PUBLIC_API_URL + "/pins";
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
        //ピン追加で即Mapに表示する用のstate、新規作成をマップとは違うページでやるならいらない
        // const createdPin = [title, lat, lng];
        // props.setPins((prevPins) => {
        //   return [...prevPins, createdPin];
        // });
        //保存成功でinputのリセット
        setLat("");
        setLng("");
        setTitle("");
        setImageFile(null);
        setNotice("新しいピンを作成しました");
        router.push("/"); //redirect
      } catch (error) {
        console.error(error, data);
        setAlert("ピンの作成に失敗しました");
        //pinの作成失敗
      }
    } else {
      setErrorMessage("未入力の項目があります");
    }
  };

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
        latitude: 6,
        longitude: 6,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toFixed(6));
          setLng(position.coords.longitude.toFixed(6));
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        options
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
