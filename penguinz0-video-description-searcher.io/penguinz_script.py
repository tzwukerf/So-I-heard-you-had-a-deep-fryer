import json
import yt_dlp
import sqlite3

conn = sqlite3.connect('penguinz0.db')
c = conn.cursor()

#URL = 'https://www.youtube.com/watch?v=piS3h7QlTrU&t=63s&ab_channel=penguinz0'
URL = 'https://www.youtube.com/@penguinz0/videos'
#'https://www.youtube.com/@penguinz0'
d = {}
file = open("corefile.txt", "w")
archivefile = open("archive.txt", "a+")
wordfile = open("word.txt", "a+")
#print(archivefile.read())
# ℹ See help(yt_dlp.YoutubeDL) for a list of available options and public functions
ydl_opts = {'cookiefile': '/mnt/c/Users/Suz/www.youtube.com_cookies.txt', 'download-archive': 'archive.txt'}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        #help(yt_dlp.YoutubeDL)

        #have a cookie so it bypasses the age check


        #file = open("corefile.txt", "w");

        info = ydl.extract_info(URL, download=False)

        #print(len(info))
        # ℹ ydl.sanitize_info makes the info json-serializable
        #print(json.dumps(ydl.sanitize_info(info)))

        dict_info = ydl.sanitize_info(info)['entries']

        for i in range(len(dict_info)):
            #print(dict_info['entries'][i])
            #print(list(dict_info.keys())[i])
        #for i in range(len(dict_info)):
            #print(dict_info[i]['id'])
            archivefile.seek(0)
            archiveread = archivefile.read()
            
            #print(archiveread)
            if dict_info[i]['id'] in archiveread:
                #print("jolly do")
                continue

            desc = str.lower(dict_info[i]['description'])
            #print(dict_info)
            main_word = ""
            str_arr = desc.split("this is the greatest ")
            if str_arr[0] == '':
                #print(str_arr)
                str_arr_2 = str_arr[1]
                str_arr_2 = str_arr_2.split(" of all time")
                main_word = str_arr_2[0]
            else:
                #condition for if the description is not this is the greatest
                continue
                #print(str_arr)
            dict_entry_word = main_word.replace(" ", "");

            #print(dict_entry_word)
            #initial_info = json.dumps(ydl.sanitize_info(info))
        #json_info = json.loads(initial_info)
            #print(main_word)
            d_temp = {}
            d_temp['id'] = dict_info[i]['id']
            d_temp['main_word'] = main_word
            d_temp['description'] = dict_info[i]['description']
            d_temp['title'] = dict_info[i]['title']
            d_temp['thumbnails'] = dict_info[i]['thumbnails'][0]['url'].split(",")[0]
            d_temp['upload_date'] = dict_info[i]['upload_date']

            #locals()[dict_entry_word] = d_temp
            locals()[dict_entry_word] = d_temp
            d[dict_info[i]['id']] = d_temp


            archive_text = dict_info[i]['id'] + '\n'
            archivefile.write(archive_text)
            
            word_text = main_word + '\n'
            wordfile.write(word_text)

if len(d) != 0:
    videos = list(d.items())
    video_list = []
    for vid in videos:
        video_list.append(tuple(list(vid[1].values())))

    c.executemany("INSERT INTO videos VALUES (?, ?, ?, ?, ?, ?)", video_list)
    c.execute("SELECT * FROM videos")
    #print(c.fetchall())
    conn.commit()
    conn.close()


    file.write(json.dumps(d))
file.close()
archivefile.close()
wordfile.close()