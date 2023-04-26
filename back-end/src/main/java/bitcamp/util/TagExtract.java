package bitcamp.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.google.gson.Gson;
import bitcamp.app.NaverAiConfig;
import opennlp.tools.postag.POSModel;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.tokenize.Tokenizer;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;

@Component
public class TagExtract {

  @Autowired private NaverAiConfig naverAiConfig;

  public HashSet<String> extract(String content) throws IOException {

    InputStream modelIn = TagExtract.class.getResourceAsStream("/en-token.bin");
    TokenizerModel model = new TokenizerModel(modelIn);
    Tokenizer tokenizer = new TokenizerME(model);
    String[] tokens = tokenizer.tokenize(content);

    InputStream posModelIn = TagExtract.class.getResourceAsStream("/en-pos-maxent.bin");
    POSModel posModel = new POSModel(posModelIn);
    POSTaggerME posTagger = new POSTaggerME(posModel);
    String[] tags = posTagger.tag(tokens);

    List<String> keywords = new ArrayList<>();
    for (int i = 0; i < tokens.length; i++) {
      String token = tokens[i];
      String posTag = tags[i];
      if (posTag.startsWith("N") || posTag.startsWith("V")) {
        keywords.add(token);
      }
    }

    InputStream swIn = TagExtract.class.getResourceAsStream("/en-stopwords.txt");
    Charset charset = StandardCharsets.UTF_8;
    List<String> stopWords = IOUtils.readLines(swIn, charset);
    keywords.removeAll(stopWords);

    Map<String, Integer> frequencyMap = new HashMap<>();
    for (String keyword : keywords) {
      frequencyMap.put(keyword, frequencyMap.getOrDefault(keyword, 0) + 1);
    }
    List<Map.Entry<String, Integer>> sortedEntries = new ArrayList<>(frequencyMap.entrySet());
    sortedEntries.sort(Map.Entry.comparingByValue(Comparator.naturalOrder()));
    List<String> topKeywords = sortedEntries.stream()
        .limit(5)
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());

    String formattedKeywords = topKeywords.stream()
        .map(keyword -> keyword + " ")
        .collect(Collectors.joining());

    String[] tagWords = formattedKeywords.split(" ");
    HashSet<String> tagWordList = new HashSet<>();

    for (String tagWord : tagWords) {
      tagWordList.add(tagWord);
    }

    return tagWordList;
  }
  public String enToKo(String cotent) {
    String clientId = "i36yjziieo";//애플리케이션 클라이언트 아이디값";
    String clientSecret = "6iGQfllD98T5LXsiNAj6tGSlgNOOHsxgdIxLlU1G";//애플리케이션 클라이언트 시크릿값";
    try {
      String text = URLEncoder.encode(cotent, "UTF-8");
      String apiURL = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
      // post request
      String postParams = "source=en&target=ko&text=" + text;
      con.setDoOutput(true);
      DataOutputStream wr = new DataOutputStream(con.getOutputStream());
      wr.writeBytes(postParams);
      wr.flush();
      wr.close();
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if(responseCode==200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {  // 오류 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();

      String jsonStr = response.toString();
      Gson gson = new Gson();
      Map<String, Object> map = gson.fromJson(jsonStr, Map.class);
      String translatedText = ((Map<String, Object>) ((Map<String, Object>) map.get("message")).get("result")).get("translatedText").toString();

      return translatedText;

    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
  }
  public String koToEn(String cotent) {
    String clientId = "i36yjziieo";//애플리케이션 클라이언트 아이디값";
    String clientSecret = "6iGQfllD98T5LXsiNAj6tGSlgNOOHsxgdIxLlU1G";//애플리케이션 클라이언트 시크릿값";
    try {
      String text = URLEncoder.encode(cotent, "UTF-8");
      String apiURL = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
      // post request
      String postParams = "source=ko&target=en&text=" + text;
      con.setDoOutput(true);
      DataOutputStream wr = new DataOutputStream(con.getOutputStream());
      wr.writeBytes(postParams);
      wr.flush();
      wr.close();
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if(responseCode==200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {  // 오류 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();

      String jsonStr = response.toString();
      Gson gson = new Gson();
      Map<String, Object> map = gson.fromJson(jsonStr, Map.class);
      String translatedText = ((Map<String, Object>) ((Map<String, Object>) map.get("message")).get("result")).get("translatedText").toString();

      return translatedText.toLowerCase();

    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
  }

  public static void main(String[] args) throws IOException {
    TagExtract tag = new TagExtract();

    String str = tag.koToEn("아이가 그림 그림속 파란 하늘과 잔디");

    HashSet<String> lists = tag.extract(str);
    HashSet<String> kolists = new HashSet<>();
    System.out.println(lists);

    for (String list : lists) {
      System.out.println(list);
      String T = tag.enToKo(list).replace(".", "");
      String M = "";
      M += "#" + T;
      kolists.add(M);
    }
    System.out.println(kolists);
  }

}
