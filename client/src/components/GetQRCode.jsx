import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import { getQrCode, verifyTOTP } from "../api";

function GetQRCode({ token, handleCodeUpdate }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    async function getQRUrl() {
      try {
        const res = await getQrCode(token);
        setUrl(res.data.url);
      } catch (error) {
        console.log(error);
      }
    }

    if (token) {
      getQRUrl();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyTOTP({
        payload: {
          code,
        },
        token: token,
      });
      console.log(res.data);
      handleCodeUpdate(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>GetQRCode!</h1>

      <p>
        Open your authenticator tool like Google Authenticator and input the
        code below
      </p>
      {url && (
        <>
          <QRCode value={url} />
          <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              placeholder="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <input type="submit" />
          </form>
        </>
      )}
    </>
  );
}

export default GetQRCode;
