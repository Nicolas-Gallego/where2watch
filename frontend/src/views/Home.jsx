

function Home() {
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <h1>Home Page</h1>
                    <form>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text" id="basic-addon1">Search</span>
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div className="mb-3">
                            <div classNameName="row">
                                <div classNameName="col-sm-10 col-md-5">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" for="inputGroupSelect01">Catégories</label>
                                        <select className="form-select" id="inputGroupSelect01">
                                            <option selected>Choose...</option>
                                            <option value="1">Action</option>
                                            <option value="2">Mangas</option>
                                            <option value="3">Comedy</option>
                                        </select>
                                    </div>
                                </div>
                                <div classNameName="col-sm-10 col-md-5">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" for="inputGroupSelect01">Platform</label>
                                        <select className="form-select" id="inputGroupSelect01">
                                            <option selected>Choose...</option>
                                            <option value="1">netflix</option>
                                            <option value="2">Prime Video</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div classNameName="col-sm-10 col-md-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div> */}
                                <div className="d-grid gap-2 col-sm-10 col-md-2">
                                    <button className="btn btn-primary" type="button">Create Account</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home;
