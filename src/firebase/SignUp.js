import React, { useState} from "react";
import { auth, provider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignUp.css";
import { useAuthState } from "react-firebase-hooks/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);  //ユーザーのログイン状態の管理

  //新規登録
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if(!window.confirm("当アプリでは、ユーザーのログイン情報（メールアドレス、ユーザーIDなど）を取得し、検索履歴や利用状況とともに、サービスの向上および広告表示の最適化に利用する場合があります。取得した情報は第三者と共有されることはなく、安全に管理されます。"))return;

      await createUserWithEmailAndPassword(auth, email, password);
      alert("ユーザー登録が完了しました！");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  //ログイン
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログインしました！");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  //googleでサインイン
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
    setEmail("");
    setPassword("");
    setError("");
  }

  return (
    <div className="sign">
      {user ? (
        <h2 className="heading">Sign out</h2>
      ) : (
        <h2 className="heading">Sign up / Sign in</h2>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: user ? "none" : "block" }}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: user ? "none" : "block" }}
        />

        {/* 新規登録ボタン */}
        <button
          onClick={handleSignUp} className="signButton"
          style={{ display: user ? "none" : "block" }}
        >新規登録</button>

        {/* ログインボタン */}
        <button
          onClick={handleSignIn} className="signButton password"
          style={{ display: user ? "none" : "block" }}
        >パスワードでログイン</button>
      </form>



      {/* Google でログイン */}
      <button onClick={signInWithGoogle} className="signButton"
        style={{ display: user ? "none" : "block" }}
      >Googleでログイン</button>

      {user ? (
        <div>
          <UserInfo />
          <SignOutButton />
        </div>
      ) : (
        <div className="userInfo red">
          <p>ログインしていません</p>
        </div>
      )}
    </div >
  );
};



export default SignUp;

//サインアウト
const SignOutButton = () => {
  return (
    <button onClick={() => auth.signOut()}
      className="signButton">
      <p>サインアウト</p>
    </button>
  )
}

const UserInfo = () => {
  return (
    <div className="userInfo green">
      <p>ログイン中です</p>
    </div>
  );
}











