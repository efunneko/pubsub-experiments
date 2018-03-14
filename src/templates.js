import jst from './jayesstee';
import drums from '../assets/drums.png';

// Add HTML elements to global namespace
jst.makeGlobal();

let templates;
export default templates = {

  page:  () => $div({cn: 'main-page'},
                    templates.header(),
                    templates.body()),

  header: () => $div({cn: 'header'},
                     "Ed's Cloud Drum"
                    ),

  body: () => $div({cn: 'body'},
                   templates.drumContainer()
                  ),

  drumContainer: () => $div({cn: 'drum-container'},
                            $img({cn: 'drums', src: drums}),
                            templates.drumButtons()
                           ),

  drumButtons: () => ("snare high-hat bass left-cymbal "+
                      "right-cymbal left-tom right-tom far-right").split(" ").
    map(name => $div({cn: "drum-"+name + " drum-button"}))

};
