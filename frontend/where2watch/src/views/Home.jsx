

function Home() {
    return (
        <div>

            <h1>Home Page</h1>
            <form>
                <fieldset disabled>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Search</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
</div>
                        <div class="mb-3">
                            <label for="disabledTextInput" class="form-label">Disabled input</label>
                            <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input" />
                        </div>
                        <div class="mb-3">
                            <label for="disabledSelect" class="form-label">Disabled select menu</label>
                            <select id="disabledSelect" class="form-select">
                                <option>Disabled select</option>
                            </select>
                        </div>


                        <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
            
        </div>
    )
}

export default Home;
