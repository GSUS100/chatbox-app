import React, { useState } from 'react';
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
		const [err, setErr] = useState(false);
		const navigate = useNavigate();
		const handleSubmit = async (e) => {
			e.preventDefault();
			const displayName = e.target[0].value;
			const email = e.target[1].value;
			const password = e.target[2].value;
			const file = e.target[3].files[0];


			try {
				const res = await createUserWithEmailAndPassword(auth, email, password);

				const storageRef = ref(storage, displayName);

				const uploadTask = uploadBytesResumable(storageRef, file);

				if(storageRef !== null)
				{
					console.log("storageRef is " + storageRef);
				}
				uploadTask.on(
					(error) => {
						// Handle unsuccessful uploads
						setErr(true);
					},
					() => {
						// Handle successful uploads on complete
						getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							});
							await setDoc(doc(db, "users", res.user.uid),{ //Add new user to firestore db
								uid: res.user.uid,
								displayName,
								email,
								photoURL: downloadURL,
							}); 
							await setDoc(doc(db, "userChats", res.user.uid), {}); //Create empty chats with new user
								navigate("/");
						});
					}
				);

			} catch (err) {
				setErr(true);
			}

		};



  return (

    <div className="formContainer">

    	<div className="formWrapper">
    		<span className="logo">G Chat</span>
    		<span className="title">Register</span>
    		<form onSubmit={handleSubmit}>
    			<input type="" placeholder='display name' />
    			<input type="email" name="" id="" placeholder='email' />
    			<input type="password" name="" id="" placeholder='password' />
    			<input style={{display: "none"}} type="file" id="file" />
    			<label htmlFor="file">
    				<img src={Add} />
    				<span>Add an avatar</span>
    			</label>

    			<button>Sign Up</button>
    			{err && <span>Something went wrong</span>}
    		</form>
    		<p>You do have an account? <Link to="/login">Login</Link></p>

    	</div>
    </div>




    )
  }

export default Register