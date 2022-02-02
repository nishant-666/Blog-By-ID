import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { app, database } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import UserImage from './assets/userImage.png';
export default function Read() {
    const [singleNote, setSingleNote] = useState({})
    let { id } = useParams();
    const getSingleNote = async () => {
        if (id) {
            const singleNote = doc(database, 'react-blogs', id)
            const data = await getDoc(singleNote)
            document.title = ({ title: data.data().title }.title)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }
    useEffect(() => {
        getSingleNote();
    }, [])
    return (
        <div className="read-form-container">
            {Object.keys(singleNote).length > 0 ? (
                <div class="blog-posts">
                    <div class="blog-content">
                        <div className="blog-main-desktop">
                            <div>
                                <p class="blog-timestamp">{singleNote.timestamp} / <span className="tags-container">{singleNote.tag}</span></p>
                                <p class="blog-title">{singleNote.title}</p>
                                <div className="author-container">
                                    <img className="avatar-img" src={singleNote.avatar ? singleNote.avatar : UserImage} avatar />
                                    <p class="author-name">{singleNote.author}</p>
                                </div>
                                <div className="banner-container">
                                    <img src={singleNote.banner} className="banner-image" />
                                </div>
                                <p class="blog-post">
                                    <div dangerouslySetInnerHTML={{ __html: `${singleNote.blogPost}` }}></div>
                                </p>
                            </div>
                        </div>

                        <div className="blog-main-mobile">
                            <div>
                                <p class="blog-timestamp">{singleNote.timestamp} / <span className="tags-container">{singleNote.tag}</span></p>
                                <p class="blog-title">{singleNote.title}</p>
                                <div className="author-container">
                                    <img className="avatar-img" src={singleNote.avatar ? singleNote.avatar : UserImage} avatar />
                                    <p class="author-name">{singleNote.author}</p>
                                </div>
                                <div className="banner-container">
                                    <img src={singleNote.banner} className="banner-image" />
                                </div>
                                <p class="blog-post">
                                    <div dangerouslySetInnerHTML={{ __html: `${singleNote.blogPost}` }}></div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <p className="loading-text">Loading...Please Wait</p>
                    <div class="loader"></div>
                </div>
            )}
        </div>
    )
}