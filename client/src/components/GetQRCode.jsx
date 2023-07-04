import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import { getQrCode, verifyTOTP } from "../api";

function GetQRCode({ token, handleCodeUpdate }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [kickOffTimer, setKickOffTimer] = useState(false);

  useEffect(() => {
    async function getQRUrl() {
      try {
        const res = await getQrCode(token);
        setUrl(res.data.url);
        setKickOffTimer(true);
      } catch (error) {
        console.log(error);
      }
    }

    if (token && timeLeft == 0) {
      setTimeLeft(30);
      getQRUrl();
    }
  }, [token, timeLeft]);

  useEffect(() => {
    let interval = null;
    if (kickOffTimer) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [kickOffTimer]);

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

          <p>Expires in {timeLeft} seconds</p>

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
