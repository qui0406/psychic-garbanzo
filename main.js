const $= document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

const heading = $('.music_name h2');
const singer =$('.singer p');
const Cd= $('.CD img');
const audio = $('#audio');
const playBtn = $('.box .fa-circle-play');
const pauseBtn= $('.fa-circle-pause');

const playlist =$('.playlist ul');

const progressing = $('.progressing');
var isPlaying= false;
const app = {
    currentIndex: 0,
    songs: [
        {
            name: 'Tình yêu khủng long',
            singer: 'FAY',
            path: './assets/mp3/TinhYeuKhungLong-FAY-6247040.mp3',
            img : './assets/img/tinhyeukhunglong.jpg'
        }, 
        {
            
            name: 'Yêu 5',
            singer: 'Rhymastic',
            path:'./assets/mp3/Yeu5-Rhymastic-4756973.mp3',
            img:'./assets/img/yeu5.jpg'
        },
        {
            name: 'Mùa hè tuyệt vời',
            singer: 'Đức Phúc',
            path:'./assets/mp3/MuaHeTuyetVoiLalawonder-DucPhuc-9835888.mp3',
            img: './assets/img/muahetuyetvoi.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path:'./assets/mp3/Mashup Nevada X Đi Đi Đi (Daniel Mastro Remix) - Vicetone, K-ICM, T-ICM, Kelsey, Zickky.mp3',
            img: './assets/img/nevada.jpg'
        },

       
        
        {
            name: 'Say you do',
            singer: 'Tiên Tiên',
            path: './assets/mp3/SayYouDo-V.A-3891316 (1).mp3',
            img: './assets/img/sayyoudu.jpg'
        }, 
        {
            name: 'Khuất lối',
            singer: 'HKray',
            path: './assets/mp3/KhuatLoiNessRemix-HKray-9873706.mp3',
            img: './assets/img/khuatloi.jpg'
        },
        {
            name: 'Cô độc vương',
            singer: 'Thien Tu',
            path: './assets/mp3/CoDocVuongRemix-ThienTu-7198443.mp3',
            img: './assets/img/codocvuong.jpg'
        }
    ],
    render: ()=>{
        const htmls = app.songs.map((song)=>{
            return `
            <li>
                <div class="img">
                    <img src="${song.img}" alt="${song.name}">
                </div>
                <div class="list-song">
                    <h2>${song.name}</h2>
                    <p>${song.singer}</p> 
                </div>
                <div class="bar"><i class="fa-solid fa-bars"></i></div>  
            </li>
            `
        });
        playlist.innerHTML=htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    getCurrentSong: function(){
        return this.songs[this.currentIndex];
    },
    loadCurrentSong :function(){

        heading.textContent = this.getCurrentSong().name;
        singer.textContent=this.getCurrentSong().singer;
        Cd.src= this.getCurrentSong().img;
        audio.src= this.getCurrentSong().path;
        console.log(Cd);
    },
    handleEvent: function(){
        // xu ly phong to thu nho CD
        const cd=$('.CD');
        const cdHeight = cd.offsetHeight;
        document.onscroll= function(){
            const scrollTop =document.documentElement.scrollTop || window.scrollY;
            const newCdHeight = cdHeight- scrollTop;
            cd.style.height= newCdHeight > 0 ? newCdHeight + 'px' : 0;
            cd.style.opacity = newCdHeight/cdHeight;
        }

        // xu ly click khi play
        playBtn.onclick= function() {
            audio.play();
            playBtn.style.display="none";
            pauseBtn.style.display="block";
        }
        pauseBtn.onclick =function(){
            audio.pause();
            pauseBtn.style.display="none";
            playBtn.style.display="block";
        }
        // playBtn.onplay= function() {
        //     audio.play();
        //     playBtn.style.display="none";
        //     pauseBtn.style.display="block";
        // }
        // pauseBtn.onpause =function(){
        //     audio.pause();
        //     pauseBtn.style.display="none";
        //     playBtn.style.display="block";
        // }
    },
}
// time_progressing
setInterval(()=>{
    progressing.style.width=`${audio.currentTime*100/ audio.duration}%` 
}, 500)
app.render();
app.handleEvent();
app.loadCurrentSong();
console.log(app.getCurrentSong());