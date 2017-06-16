/**
 * Created by Dennis on 13.06.2017.
 */

export default class App {

    constructor(img_src){
        this.img_src = img_src;
    }

    render(){
        return (
            <div className="ccm-desktop-app">
                <img src={ this.img_src } />
            </div>
        );
    }
};