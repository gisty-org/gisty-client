<template>
    <div>
        <nav-bar></nav-bar>
        <div class="py-20" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl font-bold mb-2 text-white">
                    Gisty!
                </h2>
                <h3 class="text-2xl mb-8 text-gray-200">
                    Never miss out on that important meeting ever again.
                </h3>
                <router-link to="/register" class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider focus:outline-none hover:bg-gray-200">
                    Sign Up
                </router-link>
            </div>
        </div> 
        <section class="container mx-auto px-6 p-10">
            <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
                Features
            </h2>
            <div class="flex items-center flex-wrap mb-20">
                <div class="w-full md:w-1/2 pr-8">
                    <h4 class="text-3xl text-gray-800 font-bold mb-3">AI Based Video Summarization</h4>
                    <p class="text-gray-600 mb-8">Gisty captures the content of the meeting in real-time and provides a summary of it. You can easily organize such summaries into different folders.</p>
                </div>
                <div class="w-full md:w-1/2 pl-8">
                    <img src="../assets/undraw_file_analysis_8k9b.svg" alt="Monitoring" />
                </div>
            </div>

            <div class="flex items-center flex-wrap mb-20">
                <div class="w-full md:w-1/2 px-2">
                <img src="../assets/undraw_Recording_re_5xyq.svg" alt="Reporting" />
                </div>
                <div class="w-full md:w-1/2 pl-10">
                <h4 class="text-3xl text-gray-800 font-bold mb-3">Live Transcription And Voice Based Screenshots</h4>
                <p class="text-gray-600 mb-8">The content is captured by the Gisty Browser Extension using live transcription which is then summarized. Taking snapshots of the meeting is breeze using the voice commands because, for an important meeting, audio is just not enough.</p>
                </div>
            </div>

            <div class="flex items-center flex-wrap mb-20">
                <div class="w-full md:w-1/2">
                <h4 class="text-3xl text-gray-800 font-bold mb-3">Share With Others</h4>
                <p class="text-gray-600 mb-8">Your colleague missed out on a meeting? Don't worry, we've got you covered. Easily share the summaries with everyone along with the snapshots you've captured.</p>
                </div>
                <div class="w-full md:w-1/2">
                <img src="../assets/undraw_shared_workspace_hwky.svg" alt="Syncing" />
                </div>
            </div>
        </section>
        <section class="bg-gray-100">
            <div class="container mx-auto px-6 py-16">
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
                    Testimonials
                </h2>
                <div class="flex flex-wrap">
                <div class="w-full md:w-1/3 px-2 mb-4">
                    <div class="bg-white rounded-lg shadow py-3">
                        <p class="text-gray-800 text-base px-6 mb-5">"In a hectic environment, it not only helps to summarize the meeting but also organizes it well."</p>
                        <p class="text-gray-500 text-xs md:text-sm px-6">John Doe</p>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-2 mb-4">
                    <div class="bg-white rounded-lg shadow py-3">
                        <p class="text-gray-800 text-base px-6 mb-5">"In such a busy schedule of my college, it helps to get the summary of all the meets and save my time. A big thanks to gisty."</p>
                        <p class="text-gray-500 text-xs md:text-sm px-6">Jane Doe</p>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-2 mb-4">
                    <div class="bg-white rounded-lg shadow py-3">
                        <p class="text-gray-800 text-base px-6 mb-5">"I was sick for a month, it has helped immensely to recover lost studies. Hats off to gisty!"</p>
                        <p class="text-gray-500 text-xs md:text-sm px-6">James Doe</p>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section style="background-color: #667eea">
            <div class="container mx-auto px-6 text-center py-20">
                <h2 class="mb-6 text-4xl font-bold text-center text-white">
                    Well, what are you waiting for?
                </h2>
                <h3 class="mb-10 text-2xl text-white">
                    Join Now!
                </h3>
                <router-link to="/register" class="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
                    Sign Up
                </router-link>
            </div>
        </section>
        <footer class="bg-gray-100">
            <div class="container mx-auto px-6 pt-10 pb-6">
                <div class="flex flex-wrap">
                <div class="w-full md:w-1/4 text-center md:text-left">
                    <h5 class="uppercase mb-6 font-bold">Links</h5>
                    <ul class="mb-4">
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">FAQ</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Help</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Support</a>
                    </li>
                    </ul>
                </div>
                <div class="w-full md:w-1/4 text-center md:text-left">
                    <h5 class="uppercase mb-6 font-bold">Legal</h5>
                    <ul class="mb-4">
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Terms</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Privacy</a>
                    </li>
                    </ul>
                </div>
                <div class="w-full md:w-1/4 text-center md:text-left">
                    <h5 class="uppercase mb-6 font-bold">Social</h5>
                    <ul class="mb-4">
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Facebook</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Linkedin</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Twitter</a>
                    </li>
                    </ul>
                </div>
                <div class="w-full md:w-1/4 text-center md:text-left">
                    <h5 class="uppercase mb-6 font-bold">Company</h5>
                    <ul class="mb-4">
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Official Blog</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">About Us</a>
                    </li>
                    <li class="mt-2">
                        <a href="#" class="hover:underline text-gray-600 hover:text-orange-500">Contact</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import NavBar from '../components/Navbar.vue';
export default {
    components:{
        NavBar
    }
}
</script>