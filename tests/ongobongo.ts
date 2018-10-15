import {createPost} from '../src/controllers/mysql/queries/queries';

// let tempObj = {'post_title': 'NYC Developer Dilemma', 'post_text': '', 'hanesst_id': 4, 'post_type': 'story', 'post_parent': -1, 'username': 'bingomanden', 'pwd_hash': 'fwozXFe7g0', 'post_url': 'http://avc.blogs.com/a_vc/2006/10/the_nyc_develop.html'}
let tmepObj= {'post_title': '', 'post_text': 'Can you do it again?', 'hanesst_id': 36, 'post_type': 'comment', 'post_parent': 1, 'username': 'pg', 'pwd_hash': 'Y89KIJ3frM', 'post_url': ''}

createPost(tmepObj);
