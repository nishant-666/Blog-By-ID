import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { app, database } from './firebaseConfig';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import UserImage from './assets/userImage.png';
import { AiFillHeart, AiFillLike } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { MdCelebration } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';

export default function Read() {
    const [singleNote, setSingleNote] = useState({})
    const [likesCount, setLikesCount] = useState(0);
    const [heartCount, setHeartCount] = useState(0);
    const [celebrateCount, setCelebrateCount] = useState(0);
    let { id } = useParams();
    const singleNoteRef = doc(database, 'react-blogs', id)
    const getSingleNote = async () => {
        if (id) {
            onSnapshot(singleNoteRef, (data) => {
                document.title = ({ title: data.data().title }.title)
                setSingleNote({ ...data.data(), id: data.id })
                setLikesCount(Number({ ...data.data(), id: data.id }.likeCount))
                setHeartCount(Number({ ...data.data(), id: data.id }.heartCount))
                setCelebrateCount(Number({ ...data.data(), id: data.id }.celebrateCount))
            })
        }
    }
    const handleLike = () => {
        updateDoc(singleNoteRef, {
            likeCount: Number(likesCount + 1)
        })
    }

    const handleHeart = () => {
        setHeartCount(!heartCount)
        updateDoc(singleNoteRef, {
            heartCount: Number(heartCount + 1)
        })
    }
    const handleCelebrate = () => {
        setCelebrateCount(!celebrateCount)
        updateDoc(singleNoteRef, {
            celebrateCount: Number(celebrateCount + 1)
        })
    }
    useEffect(() => {
        getSingleNote();
    }, [])
    return (
        <div className="read-form-container">
            <ToastContainer autoClose={1000} />
            {Object.keys(singleNote).length > 0 ? (
                <div className="blog-posts">
                    <div className="blog-content">
                        <div className="blog-main-desktop">
                            <div>
                                <p className="blog-timestamp">{singleNote.timestamp} / <span className="tags-container">{singleNote.tag}</span></p>
                                <p className="blog-title">{singleNote.title}</p>
                                <div className="author-container">
                                    <img className="avatar-img" src={singleNote.avatar ? singleNote.avatar : UserImage} avatar />
                                    <p className="author-name">{singleNote.author}</p>
                                </div>
                                <div className="banner-container">
                                    <img src={singleNote.banner} className="banner-image" />
                                </div>
                                <p className="blog-post">
                                    <div dangerouslySetInnerHTML={{ __html: `${singleNote.blogPost}` }}></div>
                                </p>
                                <div className="like-container">
                                    <div className="heart">
                                        <AiFillLike
                                            onClick={handleLike}
                                            className='like-icon'
                                        />
                                        <div className="like-text">{likesCount}</div>
                                    </div>
                                    <div className="heart">
                                        <AiFillHeart
                                            onClick={handleHeart}
                                            className='heart-icon'
                                        />
                                        <div className="like-text">{heartCount}</div>
                                    </div>
                                    <div className="heart">
                                        <MdCelebration
                                            onClick={handleCelebrate}
                                            className='celebrate-icon'
                                        />
                                        <div className="like-text">{celebrateCount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="blog-main-mobile">
                            <ToastContainer autoClose={1000} />
                            <div>
                                <p className="blog-timestamp">{singleNote.timestamp} / <span className="tags-container">{singleNote.tag}</span></p>
                                <p className="blog-title">{singleNote.title}</p>
                                <div className="author-container">
                                    <img className="avatar-img" src={singleNote.avatar ? singleNote.avatar : UserImage} avatar />
                                    <p className="author-name">{singleNote.author}</p>
                                </div>
                                <p className="blog-post">
                                    <div dangerouslySetInnerHTML={{ __html: `${singleNote.blogPost}` }}></div>
                                </p>

                                <div className="like-container-mobile">
                                    <div className="heart">
                                        <AiFillLike
                                            onClick={handleLike}
                                            className='like-icon'
                                        />
                                        <div className="like-text">{likesCount}</div>
                                    </div>
                                    <div className="heart">
                                        <AiFillHeart
                                            onClick={handleHeart}
                                            className='heart-icon'
                                        />
                                        <div className="like-text">{heartCount}</div>
                                    </div>
                                    <div className="heart">
                                        <MdCelebration
                                            onClick={handleCelebrate}
                                            className='celebrate-icon'
                                        />
                                        <div className="like-text">{celebrateCount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <p className="loading-text">Loading...Please Wait</p>
                    <div className="loader"></div>
                </div>
            )}
        </div>
    )
}