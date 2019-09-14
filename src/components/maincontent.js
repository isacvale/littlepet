import React from 'react'
import '../style/maincontent.scss'
import { logicalExpression } from '@babel/types';
import {BusinessCard} from './business-card'


var path = window.g.config.path


function TextoPrincipal( props ){
  return (
    <section id="texto-principal">
      <div id="anchor-servicos"></div>
      <h1>Serviços</h1>
      <h2>Cuidando de seu melhor amigo com competência e carinho</h2>
      <div className="section-text">
        <p>Na littlePet, seu companheiro é nossa prioridade. Acreditamos que além do atendimento veterinário impecável nas mãos de profissionais, ele merece ser tratado com carinho e respeito. Oferecemos a ele o atendimento humanizado e carinhoso que somente quem ama e entende os animais pode oferecer.</p>
      </div>      
    </section>
  )
}

function TitulosDosItens( props ){
  const serviceList = [
    {
      title: "Consultas",
      text: "O atendimento clínico ideal para seu pet. Traga-o se estiver com problemas, mas também preventivamente para que continue saudável.",
      imgName: "service-clinical.png",
      imgAlt: "Homem se inclinando sobre gato, enquanto o olha atentamente."
    },
    {
      title: "Vacinas",
      text: "A saúde de seu companheiro, e também a sua, dependem de mantê-lo imunizado e saudável.",
      imgName: "service-vaccine.png",
      imgAlt: "Cachorro deitado, olhando com o canto do olho e feição resignada."
    },
    {
      title: "Outros",
      text: "Oferecemos vários os serviços que o webmaster não foi capaz de pensar. Pergunte-nos quais!",
      imgName: "service-outros.png",
      imgAlt: "Pequeno cachorro deitado confortavelmente."
    }
  ]
  const servicesRendering = serviceList.map( function(service, idx){
    return(
            <ItemCard title={service.title} 
              text={service.text} 
              imgName={service.imgName}></ItemCard>
    )    
  })
  return (
    <section id="titulos-dos-itens">
      <div id="anchor-itens"></div>
      <h1>...para seu melhor amigo</h1>
      <div>{ servicesRendering }</div>
    </section>
  )
}

function ItemCard( props ){
  return (
    <div className="item-card" key={props.title}>
      <div className={`item-img item-${props.title.toLowerCase()}`}></div>
      {/* <img alt={props.imgAlt}/> */}
      <div>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

class GaleriaDeFotos extends React.Component{
  constructor( props ){
    super( props )
    this.state={
      data: [],
      index: 0,
      showPics: false,
      lightbox: false
    }

    // We keep a simple cache of the pictures to avoid
    this.cache = {}
    this.x = ""
  }
  componentDidMount(){
    const self = this
    fetch(`${path}/data/fotos.json`)
      .then( res => res.json() )
      .then( async dataJSON => {
        self.setState({"data": dataJSON.map( (item, idx) => {
            item.idx=idx
            return item
          })
        })

        let promise = new Promise( async function(resolve,reject){

            await dataJSON.forEach( fotoData => {
              self.cache[fotoData.foto] =
                <img  src={`${path}/images/${fotoData.foto.replace(".png","-S.png")}`}
                      alt={fotoData.alt}>
                </img>
          })
          resolve( self.cache )
        })
        .then( ()=> self.revealPictures() )
        })

    window.addEventListener('resize', function(){self.forceUpdate()})
  }
  revealPictures(){
    this.setState({"showPics": true})
  }
  changePictures( direction = "forward" ){
    let newIndex = this.state.index
    direction == "forward" ? newIndex++ : newIndex--
    if( newIndex < 0 ) newIndex = 0
    if( newIndex >= this.state.data.length ) newIndex = this.state.data.length-1
    this.setState({index: newIndex})
  }
  setLightbox( picData ){
    this.setState({lightbox: picData})
  }
  render(){
    // Prevent body from scrolling behind the overlay
    if( this.state.lightbox )
      document.querySelector("body").classList.add("no-scroll")
    else
      document.querySelector("body").classList.remove("no-scroll")


    return (
      <section id="galeria-de-fotos" className={this.state.showPics ? "" : "minified"}>
        <div id="anchor-fotos"></div>
        <h1>Galeria de Fotos</h1>
        <FotoCanvas picData={this.state.data}
                    // fotos={selectedPics}
                    cache={this.cache}
                    changePictures={this.changePictures.bind(this)}
                    picIndex={this.state.index}
                    setLightbox={this.setLightbox.bind(this)}>
        </FotoCanvas>
        {
          this.state.lightbox ?
            <LightBox setLightbox={this.setLightbox.bind(this)}
                      picData={this.state.lightbox}
                      // changePictures={this.changePictures.bind(this)}
                      allData={this.state.data}></LightBox>
            : ""
        }
      </section>
    )
  }
}

function FotoCanvas( props ){

  let numberOfPictures = Math.min(
                          Math.floor( window.innerWidth/300 ),
                          props.picData.length
                        )
  let picIndex = Math.min(
                  props.picIndex,
                  props.picData.length - numberOfPictures
                )
  const selectedPics = props.picData.slice( picIndex, numberOfPictures+picIndex )


  const listOfPics = selectedPics.map( (foto,idx) => 
    <FotoIndividual dados={foto}
                    cache={props.cache}
                    idx={idx}
                    setLightbox={props.setLightbox}
                    >                  
    </FotoIndividual>
  )
  
  return(
    <div id="foto-canvas">
      <div className="back" onClick={()=>props.changePictures("back")}></div>
      <div className="picture-wrapper">
        { listOfPics }
      </div>
      <div className="forward" onClick={()=>props.changePictures("forward")}></div>
    </div>
  )
}

function FotoIndividual( props ){
  if( !props.cache[ props.dados.foto ] ) return ""
  const angleList = 
  [1.5, -1.4, -1.1, 3.2, 1.41, -2.4, 3, -3.5, 0.71, 3, 1.3, -2.8, -0.5, 3.71, -0.79, 3.8, -4, 1.91, 4, 2.91, -1.1, -0.29, -2.7, 0.91, -3.9, -3.9, -3, -1.2, 4, -1.79]
  const angle = angleList[props.dados.idx]

  // TODO: pre-caching ain't working. Every declaration of picture loads the image again.
  const img = props.cache[ props.dados.foto ]
  const text = <p>{props.dados.texto}</p>
  let picture = <div  className="photo-frame"
                      style={{transform: `rotate(${angle}deg)`}}
                      onClick={()=>{props.setLightbox(props.dados)}}
                >
                  {img}
                  {text}
                </div>
  return picture
}

class LightBox extends React.Component{
  constructor(props){
    super(props)
    this.state={
      idx: this.props.picData.idx
    }
  }
  changePic( n=1 ){
    let newIndex = this.state.idx+n
    newIndex = Math.max( newIndex, 0 )
    newIndex = Math.min( newIndex, this.props.allData.length-1)
    this.setState({idx: newIndex})
  }
  render(){
    console.log('picData',this.props.picData)

    return (
      <div id="lightbox" onClick={()=>this.props.setLightbox(false)}>
        <div id="lightbox-background"></div>
        <div id="lightbox-foreground"
              onClick={ e => e.stopPropagation() }>

          <div className="back" onClick={()=>this.changePic(-1)}></div>
          <picture>
            <img  src={`${path}/images/${this.props.allData[this.state.idx].foto}`.replace(".png","-M.png")}
                  alt={this.props.allData[this.state.idx].alt}></img>
          </picture>
          <div className="forward" onClick={()=>this.changePic(+1)}></div>
          <p className="pic-legend">{this.props.allData[this.state.idx].texto}</p>
        </div>
      </div>

    )
  }
}

function OndeNosEncontrar( props ){
  return (
    <section id="onde-nos-encontrar">
      <div id="anchor-localizacao"></div>
      <h1>Onde nos encontrar</h1>
      <div className="wrap-content">
        <div id="google-map-wrapper">
          <iframe id="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15356.207762298765!2d-47.94216571274008!3d-15.801215024750928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a307c5cffffff%3A0x5bf43a5f7384f5a4!2sBuilding+Omega+Center!5e0!3m2!1sen!2sbr!4v1565266710923!5m2!1sen!2sbr"
                frameborder="0"
                allowfullscreen>          
          </iframe>
        </div>
        <div  id="wrap-contact"
              itemscope
              itemtype="https://schema.org/LocalBusiness">
          <img  src={`${path}/images/logo-simple.svg`}
                alt={"Logo da littlePet"}
                itemprop="logo"></img>
          <address>
            
            <p className="brand"><span>little</span> <span>Pet</span></p>
            <p>Traga seu companheiro para</p>
            <p itemprop="address">CCSW 05 Bloco A Loja 33,<br></br>Edifício Ômega<br></br>Sudoeste - Brasília</p>
            <p className="microtext">(na avenida do Pão de Açúcar).</p>
            <p>Você também pode agendar uma visita pelo telefone</p>
            <p><a href="tel:+556130532373"><span itemprop="telephone">(61) 3053 2373</span></a></p>
            <p>ou pelo email</p>
            <p><a href="mailto:raquel@example.com"><span itemprop="email">raquel@example.com</span></a>.</p>
          </address>
        </div>
      </div>
    </section>
  )
}

function Epilogo(){
  return (
    <section id="section-epilogo">
      <div id="anchor-epilogo"></div>
      <BusinessCard></BusinessCard>
    </section>
  )
}

class Maincontent extends React.Component{

  constructor( props ){
    super( props )
    this.state = {
      ok: true
    }
  }

  render(){
    return (
      <main>
        <TextoPrincipal></TextoPrincipal>
        <TitulosDosItens></TitulosDosItens>
        <GaleriaDeFotos></GaleriaDeFotos>
        <OndeNosEncontrar></OndeNosEncontrar>
        <Epilogo></Epilogo>
      </main>
    )
  }

}

export {Maincontent}
