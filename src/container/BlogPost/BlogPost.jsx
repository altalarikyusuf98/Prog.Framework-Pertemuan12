import { Component } from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post"

class BlogPost extends Component {
    state = {                // komponen state dari React untuk statefull component
        listArtikel: [],      // variabel array yang digunakan untuk menyimpan data API
        inserArtikel: {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        }
    }

    ambilDataDariServerAPI() {   // komponen untuk mengecek ketika component telah dimounting, maka panggil API
        fetch('http://localhost:3001/posts?_sort=id&_order=desc')
            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {   // komponen untuk mengecek ketika component telah dimounting, maka panggil API
        this.ambilDataDariServerAPI()
    }

    handleHapusArtikel = (data) => {
        fetch(`http://localhost:3001/posts/${data}`,
            { method: 'DELETE' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahArtikel = (event) => {
        // fungsi untuk meng-handle form tambah data artikel
        let formInsertArtikel = { ...this.state.insertArtikel }; // cloning data state insertArtikel ke dalam variabel formInsertArtikel
        let timestamp = new Date().getTime(); // digunakan untuk menyimpan waktu (sebagai id artikel)
        formInsertArtikel["id"] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value; // menyimpan data onChange ke formInsertArtikel sesuai dengn target yang diisi
        this.setState({
            insertArtikel: formInsertArtikel
        });
    };

    handleTombolSimpan = () => {
        // fungsi untuk meng-handle tombol simpan
        fetch("http://localhost:3001/posts", {
            method: `post`, // method POST untuk input atau insert data
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertArtikel) // kirimkan ke body request untuk data artikel yang akan ditambahkan (insert)
        })
            .then((response: Response) => {
                this.ambilDataDariServerAPI(); // reload / refresh data
            });
    }


    render() {
        return (
            <div className="post-artikel">
                <div className="form pb-2 mt-3 border-bottom">
                    <div className="form-gorup row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">
                            Judul
                </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                onChange={this.handleTambahArtikel}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">
                            Isi
                </label>
                        <div className="col-sm-10">
                            <textarea
                                name="body"
                                id="body"
                                rows="3"
                                className="form-control"
                                onChange={this.handleTambahArtikel}
                            ></textarea>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleTombolSimpan}
                    >
                        Simpan
              </button>
                </div>
                <h2>Daftar Artikel</h2>
                {this.state.listArtikel.map((artikel) => {
                    // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                    return (
                        <Post
                            key={artikel.id}
                            judul={artikel.title}
                            isi={artikel.body}
                            idArtikel={artikel.id}
                            hapusArtikel={this.handleHapusArtikel}
                        />
                    ); // mappingkan data json dari API sesuai dengan kategorinya
                })}
            </div>
        );
    }
}

export default BlogPost;