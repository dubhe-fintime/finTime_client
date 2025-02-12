#####################################
#####################################
##        관리자(5000 포트)         ##
#####################################
#####################################
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import timedelta

from flask import Flask, session, request, render_template, send_file
from flask_socketio import SocketIO
from flask import jsonify
from flask_cors import CORS

import time

import os


import configparser

# 서버 경로 취득
script_dir = os.path.dirname(os.path.abspath(__file__))

# ini 정보 취득
environment = os.getenv('ENVIRONMENT', 'development')

# ini 정보 취득
if environment == 'production':
    config_path = os.path.join(script_dir, 'config.ini')
else:
    config_path = os.path.join(script_dir, 'config_development.ini')
config = configparser.ConfigParser()
config.read(config_path, encoding="utf-8")
domain = config['SERVER']['domain']
port = config['SERVER']['port_1']
real_yn = config['SERVER']['real']
server_host = config['SERVER']['server_host']
success = config['CODE']['success']
error = config['CODE']['error']
ssl_cert = config['SECURE']['ssl_cert']
ssl_key = config['SECURE']['ssl_key']

########### 로그 셋팅부 START#################
logger = logging.getLogger('admin')
loggerlevel = config['LOG']['loggerlevel']

# 로그 레벨 문자열을 대문자로 변환하여 사용
if loggerlevel == "INFO":
    logger.setLevel(logging.INFO)
elif loggerlevel == "DEBUG":
    logger.setLevel(logging.DEBUG)
elif loggerlevel == "WARNING":
    logger.setLevel(logging.WARNING)
elif loggerlevel == "ERROR":
    logger.setLevel(logging.ERROR)
elif loggerlevel == "CRITICAL":
    logger.setLevel(logging.CRITICAL)
else:
    print("유효한 로그 레벨이 아닙니다.")

# 현재 스크립트 파일이 위치한 폴더 경로 가져오기
script_dir = os.path.dirname(os.path.abspath(__file__))

# logs 폴더 경로 설정
log_dir = os.path.join(script_dir, "logs")

# logs 폴더가 없으면 생성
os.makedirs(log_dir, exist_ok=True)

# 로그 파일 경로 설정
log_file = os.path.join(log_dir, "admin.log")

# 날짜별로 로그 파일 분리 (midnight: 자정에 로그 파일 분리)
handler = TimedRotatingFileHandler(
    log_file, when="midnight", interval=1, encoding="utf-8")
handler.suffix = "%Y-%m-%d"  # 로그 파일명에 붙을 날짜 형식 설정

# 로그 메시지 포맷 설정
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

# 핸들러 추가
logger.addHandler(handler)

config['CODE']['session_fail']

app = Flask(__name__)
CORS(app)
app.secret_key = config['SERVER']['secret_key']  # 필수 값 (지정 필요)

socketio = SocketIO(app)

if environment == 'development':
    domain = f"{domain}:{port}"
else:
    domain = f"{domain}"

# 관리자 index 화면 호출
@app.route("/")
def adminLogin():
    #return render_template("common/login.html", domain=domain, port=port)
    return render_template("page/index.html", domain=domain)

@app.route("/Main")
def Main():
    #return render_template("common/login.html", domain=domain, port=port)
    return render_template("page/fintimeMain.html", domain=domain)

if __name__ == "__main__":
    while True:
        try:
            if real_yn == "Y":  # 운영 서버 여부
                # SSL 인증서 및 키 파일 경로
                # restart_rasa()
                socketio.run(app, host=server_host, port=port, ssl_context=(
                    ssl_cert, ssl_key), allow_unsafe_werkzeug=True)
            else:
                # 앱 실행
                # socketio.run(app)
                app.run(host='0.0.0.0', port=port, debug=True)
        except Exception as e:
            logging.error(f"Server Error: {e}")
        time.sleep(5)  # 서버가 중단되었을 경우 5초 후 재시작 시도
