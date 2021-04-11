import { Component } from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post"
import API from "../../services/index"

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

    ambilDataDariServer = () => {
        API.getNewsBlog()
            .then(result => {
                this.setState({
                    listArtikel: result
                })
            })
    }

    componentDidMount() {   // komponen untuk mengecek ketika component telah dimounting, maka panggil API
        this.ambilDataDariServer()
    }

    handleHapusArtikel = (data) => { //Fungsi yang menghandle button action hapus data
        API.deleteNewsBlog(data) // alamat url api yang ingin kita hapus datanya
            .then(Response => { //Ketika proses hapus berhasil, maka ambil data dari server API Lokal
                this.ambilDataDariServer()
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
        API.postNewsBlog(this.state.insertArtikel)
            .then((Response) => {
                this.ambilDataDariServer();
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